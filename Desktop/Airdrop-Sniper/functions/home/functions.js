const { validationResult } = require("express-validator");
const coins = require("../../database/coins");
const fs = require("fs");
const path = require("path");
const vote = require("../../database/vote");

const submittedIPs = new Set();
const submittedVotes = new Map();

exports.coinsave = async (req, res, next) => {
  const ipAddress = req.ip;
  const sessionID = req.sessionID;

  if (submittedVotes.has(ipAddress) || submittedVotes.has(sessionID)) {
    res
      .status(400)
      .json({ errors: ["You can only submit the form once per day."] });
    return;
  }

  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }

  const launchDay = req.body.launchday;
  const launchMonth = req.body.launchmonth;
  const launchYear = req.body.launchyear;
  const launchDate = new Date(launchYear, launchMonth - 1, launchDay);
  const turkceKarakterMap = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
  };
  let coinName = req.body.name;
  coinName = coinName.replace(/ /g, "-");
  for (let turkceKarakter in turkceKarakterMap) {
    const degisim = turkceKarakterMap[turkceKarakter];
    const regex = new RegExp(turkceKarakter, "g");
    coinName = coinName.replace(regex, degisim);
  }

  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  coinName += `-${randomNumber}`;

  const coinall = new coins({
    logo: req.body.logo,
    name: req.body.name,
    symbol: req.body.symbol,
    contract: req.body.contract,
    network: req.body.network,
    customswap: req.body.customswap,
    website: req.body.website,
    email: req.body.email,
    telegramuser: req.body.telegramuser,
    coingecko: req.body.coingecko,
    description: req.body.description,
    coinUrl: coinName,
    launchdate: launchDate,
    customchart: req.body.customchart,
    telegram: req.body.telegram,
    twitter: req.body.twitter,
    discord: req.body.discord,
    coinmarketcap: req.body.coinmarketcap,
    presale: req.body.presale,
    nopresale: req.body.nopresale,
    presaledate: req.body.presaledate,
    presaleenddate: req.body.presaleenddate,
    launchDate: req.body.launchDate,
    presalelink: req.body.presalelink,
  });

  if (req.files && req.files.logo && req.files.logo.length > 0) {
    const logoFile = path.join(
      __dirname,
      "../../www/home/coinimages",
      req.files.logo[0].filename,
    );
    coinall.logo = req.files.logo[0].filename;
  } else {
    const existinglogo = await coins.findOne({});
    coinall.logo = existinglogo.logo;
  }

  await coinall.save();

  submittedVotes.set(ipAddress, true);
  submittedVotes.set(sessionID, true);

  const expirationDate = new Date();
  expirationDate.setHours(23, 59, 59);

  setTimeout(() => {
    submittedVotes.delete(ipAddress);
    submittedVotes.delete(sessionID);
  }, expirationDate.getTime() - Date.now());

  res.status(200).json({ success: "Success Redirect" });
};

const submittedVotesForCoins = new Map();
const submittedVotesBySession = new Map();

exports.votesubmit = async (req, res, next) => {
  errors = validationResult(req);
  const ipAddress = req.ip;
  const sessionID = req.sessionID;

  const coinID = req.body.coinId;

  // Check if the user has already voted for this coin
  if (
    submittedVotesForCoins.has(`${coinID}_${ipAddress}`) ||
    submittedVotesBySession.has(`${coinID}_${sessionID}`)
  ) {
    res
      .status(400)
      .json({
        errors: ["You can only submit the vote once per day for this coin"],
      });
    return;
  }

  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }

  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  const uniqueCoinID = `${coinID}-${randomNumber}`;

  const votes = new vote({
    coinId: uniqueCoinID,
    vote: 1,
    coinsId: req.body.coinId,
  });

  await votes.save();
  res.status(200).json({ success: ["voting successfully completed"] });

  // Set vote submission flag for this coin and session
  submittedVotesForCoins.set(`${coinID}_${ipAddress}`, true);
  submittedVotesBySession.set(`${coinID}_${sessionID}`, true);

  const expirationDate = new Date();
  expirationDate.setHours(23, 59, 59);

  setTimeout(() => {
    submittedVotesForCoins.delete(`${coinID}_${ipAddress}`);
    submittedVotesBySession.delete(`${coinID}_${sessionID}`);
  }, expirationDate.getTime() - Date.now());

  console.log(votes);
};

const support = require("../../database/support");

exports.supports = async (req, res, next) => {
  try {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((error) => error.msg);
      res.status(400).json({ errors: errorMessage });
      return;
    }

    const supsave = new support({
      username: req.body.username,
      email: req.body.emails,
      wrightsubject: req.body.wrightsubject,
      message: req.body.message,
    });

    await supsave.save();
    res.status(200).json({ msg: ["Success."] });
  } catch (err) {
    console.log(err);
  }
};
