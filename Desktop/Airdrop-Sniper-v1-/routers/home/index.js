const routers = require("express").Router();
const images = require("../../functions/home/multer");
const functions = require("../../functions/home/functions");
const siteerror = require("../../functions/home/validator");
const coin = require("../../database/coins");
const votes = require("../../database/vote");
const airdrops = require("../../database/airdrop");
const homepages = require("../../database/homepages");
const sites = require("../../database/site");
const reklam = require("../../database/ads");

routers.get("/newlisting", async (req, res) => {
  const twentyFourHoursAgo = moment()
    .subtract(24, "hours")
    .format("DD MMMM YYYY HH:mm:ss");

  const result = await votes.aggregate([
    {
      $match: {
        createdAt: {
          $gte: twentyFourHoursAgo,
        },
      },
    },
    {
      $group: {
        _id: "$coinsId",
        totalVotes: {
          $sum: "$vote",
        },
      },
    },
    {
      $sort: {
        totalVotes: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const coinIds = result.map((entry) => entry._id);

  const coinsResult = await coin.find({
    _id: {
      $in: coinIds,
    },
  });

  newcoins = await coin.find({ status: true }).sort({ vote: -1 }).limit(5);
  const votesim = await votes.aggregate([
    { $group: { _id: "$coinsId", totalVote: { $sum: "$vote" } } },
    {
      $lookup: {
        from: "coins",
        localField: "_id",
        foreignField: "_id",
        as: "coin",
      },
    },
    { $unwind: "$coin" },
    { $match: { "coin.status": true } },
    { $project: { _id: 0, coinName: "$coin.name", totalVote: 1 } },
  ]);
  const totalVotesResult = await votes.aggregate([
    {
      $group: {
        _id: "$coinsId",
        totalVotes: { $sum: "$vote" },
      },
    },
  ]);
  promoted = await coin.find({ promoted: true, status: true });
  presale = await coin.find({ presale: "Presale", status: true });
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});
  const airdrop = await airdrops.findOne({});
  const homepage = await homepages.findOne({});

  allcoins = await coin.find({}).sort({ date: -1 });
  res.render("home/pages/newlisting", {
    allcoins: allcoins,
    coins: coinsResult,
    newcoins,
    promoted,
    presale,
    voteCounts: result,
    votesim,
    totalVotes: totalVotesResult,
    site,
    reklamlar,
    airdrop,
    homepage,
  });
});

routers.get("/", async (req, res) => {
  const twentyFourHoursAgo = moment()
    .subtract(24, "hours")
    .format("DD MMMM YYYY HH:mm:ss");

  const result = await votes.aggregate([
    {
      $match: {
        createdAt: {
          $gte: twentyFourHoursAgo,
        },
      },
    },
    {
      $group: {
        _id: "$coinsId",
        totalVotes: {
          $sum: "$vote",
        },
      },
    },
    {
      $sort: {
        totalVotes: -1,
      },
    },
  ]);

  const sortedResult = result.sort((a, b) => b.totalVotes - a.totalVotes);

  const coinIds = sortedResult.map((entry) => entry._id);

  const coinsResult = await coin
    .find({
      _id: {
        $in: coinIds,
      },
    })
    .lean()
    .exec();

  coinsResult.sort((a, b) => {
    const coinA = sortedResult.find((entry) => entry._id.equals(a._id));
    const coinB = sortedResult.find((entry) => entry._id.equals(b._id));
    return sortedResult.indexOf(coinA) - sortedResult.indexOf(coinB);
  });

  newcoins = await coin.find({ status: true }).sort({ date: -1 }).lean().exec();

  const votesim = await votes.aggregate([
    { $group: { _id: "$coinsId", totalVote: { $sum: "$vote" } } },
    {
      $lookup: {
        from: "coins",
        localField: "_id",
        foreignField: "_id",
        as: "coin",
      },
    },
    { $unwind: "$coin" },
    { $match: { "coin.status": true } },
    { $project: { _id: 0, coinName: "$coin.name", totalVote: 1 } },
  ]);

  const totalVotesResult = await votes.aggregate([
    {
      $group: {
        _id: "$coinsId",
        totalVotes: { $sum: "$vote" },
      },
    },
  ]);

  const promotedResult = await coin
  .find({ promoted: true, status: true })
  .lean()
  .exec();


// Sıralamayı oy sayısına göre yaparken, eğer oy sayıları eşitse, id'ye göre sıralanması sağlanıyor.
const sortedPromotedCoins = promotedResult.sort((a, b) => {
  const coinA = sortedResult.find((entry) => entry._id.equals(a._id));
  const coinB = sortedResult.find((entry) => entry._id.equals(b._id));
  
  // Eğer hiç oy almamışsa, o coin'i en sonda göstermek için bir kıyas yapılıyor.
  if (!coinA && !coinB) {
    return 0; // Eşitlik durumunda id'ye göre sıralanması sağlanıyor.
  } else if (!coinA) {
    return 1; // coinA oyu olmayan bir coin ise, bunu en sonda göstermek üzere 1 döndürülüyor.
  } else if (!coinB) {
    return -1; // coinB oyu olmayan bir coin ise, bunu en sonda göstermek üzere -1 döndürülüyor.
  } else {
    return sortedResult.indexOf(coinA) - sortedResult.indexOf(coinB);
  }
});
  presale = await coin.find({ presale: "on", status: true });
  const airdrop = await airdrops.findOne({});
  const homepage = await homepages.findOne({});
  const site = await sites.findOne({});
  const reklamlar = await reklam.findOne({});

  res.render("home/pages/index", {
    coins: coinsResult,
    newcoins,
    promoted: sortedPromotedCoins,
    presale,
    voteCounts: sortedResult,
    votesim,
    totalVotes: totalVotesResult,
    airdrop,
    homepage,
    site,
    reklamlar,
  });
});

routers.get("/todaybestcoins", async (req, res) => {
  const coins = await coin.find({ status: true });
  const coinim = await coin.find({ status: true }).sort({ vote: -1 }).limit(5);

  const voteCounts = await votes.aggregate([
    { $group: { _id: "$coinsId", totalVote: { $sum: "$vote" } } },
    {
      $lookup: {
        from: "coins",
        localField: "_id",
        foreignField: "_id",
        as: "coin",
      },
    },
    { $unwind: "$coin" },
    { $match: { "coin.status": true } },
    { $project: { _id: 0, coinName: "$coin.name", totalVote: 1 } },
  ]);
  const site = await sites.findOne();

  res.render("home/pages/todaybestcoins", { coins, coinim, voteCounts, site });
});

routers.get("/allbestcoins", async (req, res) => {
  const twentyFourHoursAgo = moment()
    .subtract(24, "hours")
    .format("DD MMMM YYYY HH:mm:ss");

  const result = await votes.aggregate([
    {
      $match: {
        createdAt: {
          $gte: twentyFourHoursAgo,
        },
      },
    },
    {
      $group: {
        _id: "$coinsId",
        totalVotes: {
          $sum: "$vote",
        },
      },
    },
    {
      $sort: {
        totalVotes: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  const coinIds = result.map((entry) => entry._id);

  const coinsResult = await coin.find({
    _id: {
      $in: coinIds,
    },
  });

  newcoins = await coin.find({ status: true }).sort({ vote: -1 }).limit(5);
  const votesim = await votes.aggregate([
    { $group: { _id: "$coinsId", totalVote: { $sum: "$vote" } } },
    {
      $lookup: {
        from: "coins",
        localField: "_id",
        foreignField: "_id",
        as: "coin",
      },
    },
    { $unwind: "$coin" },
    { $match: { "coin.status": true } },
    { $project: { _id: 0, coinName: "$coin.name", totalVote: 1 } },
  ]);
  const totalVotesResult = await votes.aggregate([
    {
      $group: {
        _id: "$coinsId",
        totalVotes: { $sum: "$vote" },
      },
    },
  ]);
  promoted = await coin.find({ promoted: true, status: true });
  presale = await coin.find({ presale: "Presale", status: true });
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});
  const airdrop = await airdrops.findOne({});
  const homepage = await homepages.findOne({});

  const top50Result = await votes.aggregate([
    {
      $group: {
        _id: "$coinsId",
        totalVotes: {
          $sum: "$vote",
        },
      },
    },
    {
      $sort: {
        totalVotes: -1,
      },
    },
    {
      $limit: 50,
    },
  ]);

  const top50CoinIds = top50Result.map((entry) => entry._id);

  const top50CoinsResult = await coin.find({
    _id: {
      $in: top50CoinIds,
    },
  });

  const sortedTop50Coins = top50CoinsResult.sort((a, b) => {
    const coinA = top50Result.find((entry) => entry._id.equals(a._id));
    const coinB = top50Result.find((entry) => entry._id.equals(b._id));

    if (coinA && coinB) {
      return coinB.totalVotes - coinA.totalVotes;
    }
    return 0;
  });

  res.render("home/pages/allbestcoins", {
    coins: coinsResult,
    newcoins,
    promoted,
    presale,
    voteCounts: result,
    votesim,
    totalVotes: totalVotesResult,
    site,
    reklamlar,
    airdrop,
    homepage,
    top50Coins: sortedTop50Coins,
  });
});

routers.get("/presalecoins", async (req, res) => {
  const coins = await coin.find({ status: true });
  const coinim = await coin.find({ status: true }).sort({ vote: -1 }).limit(5);

  const voteCounts = await votes.aggregate([
    { $group: { _id: "$coinsId", totalVote: { $sum: "$vote" } } },
    {
      $lookup: {
        from: "coins",
        localField: "_id",
        foreignField: "_id",
        as: "coin",
      },
    },
    { $unwind: "$coin" },
    { $match: { "coin.status": true } },
    { $project: { _id: 0, coinName: "$coin.name", totalVote: 1 } },
  ]);
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});

  res.render("home/pages/presalecoins", {
    coins,
    coinim,
    voteCounts,
    site,
    reklamlar,
  });
});

routers.get("/contact", async (req, res) => {
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});

  res.render("home/pages/contact", { site, reklamlar });
});

routers.get("/submit_project", async (req, res) => {
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});

  res.render("home/pages/submit_project", { site, reklamlar });
});

routers.get("/coins/:url", async (req, res) => {
  const url = req.params.url;
  const coinData = await coin.findOne({ coinUrl: url });
  const voteData = await votes.find({ coinsId: coinData._id });

  let totalVotes = 0;
  let totalVotesLast24Hours = 0;

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  for (const vote of voteData) {
    totalVotes += vote.vote;
    if (new Date(vote.createdAt) > twentyFourHoursAgo) {
      totalVotesLast24Hours += vote.vote;
    }
  }
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne({});

  res.render("home/pages/coin-detail", {
    coins: coinData,
    totalVotes,
    totalVotesLast24Hours,
    site,
    reklamlar,
  });
});

routers.get("/arama", async (req, res, next) => {
  const keyword = req.query.keyword; // Aranan kelimeyi al

  try {
    const regex = new RegExp(keyword, "i"); // Aranan kelimeye göre case-insensitive regex oluştur
    const coins = await coin.find({ name: regex }).limit(10); // Veritabanında eşleşen coinleri bul (maksimum 10 sonuç)
    res.json(coins); // Sonuçlar JSON formatında döndür
  } catch (error) {
    next(error);
  }
});

/////////////////////// POST /////////////////////////
routers.post(
  "/coinsave",
  images.fields([
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  siteerror.sitebilgi(),
  functions.coinsave,
);

routers.post("/supports", siteerror.support(), functions.supports);

routers.post("/votesubmit", functions.votesubmit);

module.exports = routers;
