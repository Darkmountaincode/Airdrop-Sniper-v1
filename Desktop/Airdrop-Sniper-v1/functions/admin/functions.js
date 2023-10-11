const { validationResult } = require("express-validator");
const airdrops = require("../../database/airdrop");
const homepages = require("../../database/homepages");
const site = require("../../database/site");
const fs = require("fs");
const path = require("path");
const Reklam = require("../../database/ads");
const reklamlar = require("../../database/ads");
const coins = require("../../database/coins");
const Vote = require("../../database/vote");
const uyeler = require("../../database/uyeler");

require("../../functions/admin/passport")(passport);

exports.sitebilgileri = async (req, res, next) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }

  try {
    const sitebilgileri = {
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.anahtar,
      url: req.body.url,
      googleanalytics: req.body.analiyctics,
      socialmedia: {
        twitter: req.body.twitter,
        discord: req.body.discord,
        instagram: req.body.instagram,
        telegram: req.body.telegram,
      },
    };

    // Logo kontrolü ve güncelleme
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/uploads",
        req.files.logo[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      sitebilgileri.logo = req.files.logo[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      const existingSite = await site.findOne({});
      sitebilgileri.logo = existingSite.logo;
    }

    // Favicon kontrolü ve güncelleme tskk // nereeye ekliyordukkkkkkkkkk
    if (req.files && req.files.favicon && req.files.favicon.length > 0) {
      const faviconDosyaYolu = path.join(
        __dirname,
        "../../www/admin/uploads",
        req.files.favicon[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      sitebilgileri.favicon = req.files.favicon[0].filename;
    } else {
      // Favicon eklenmediyse veritabanındaki değeri koru
      const existingSite = await site.findOne({});
      sitebilgileri.favicon = existingSite.favicon;
    }

    await site.findOneAndUpdate({}, sitebilgileri);
    res.status(200).json({ msg: ["Güncelleme Başarılı"] });
  } catch (err) {
    console.log(err);
  }
};

exports.anasayfaayar = async (req, res, next) => {
  try {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((error) => error.msg);
      res.status(400).json({ errors: errorMessage });
      return;
    }

    const anasayfa = {
      favorite: req.body.favorite,
      favoritealtad: req.body.favoritealtad,
      newlist: req.body.newlist,
      newlistaltad: req.body.newlistaltad,
      altbaslik: req.body.altbaslik,
      altad: req.body.altad,
      biralt: req.body.biralt,
      biraltad: req.body.biraltad,
    };

    await homepages.findOneAndUpdate({}, anasayfa);
    res.status(200).json({ msg: ["Güncelleme Başarıyla Tamamlandı."] });
  } catch (err) {
    console.log(err);
  }
};

exports.airdrops = async (req, res, next) => {
  try {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.array().map((error) => error.msg);
      res.status(400).json({ errors: errorMessage });
      return;
    }

    const airdropsbilgi = {
      baslik: req.body.baslik,
      saribaslik: req.body.saribaslik,
      altbaslik: req.body.altbaslik,
      butonadi: req.body.butonadi,
      baslangic: req.body.baslangic,
      bitis: req.body.bitis,
      url: req.body.url,
    };

    await airdrops.findOneAndUpdate({}, airdropsbilgi);
    res.status(200).json({ msg: ["Güncelleme Başarıyla Tamamlandı."] });
  } catch (err) {
    console.log(err);
  }
};

exports.reklamguncelle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessage });
  }
  try {
    const reklamguncelle = {
      reklamlarurl: req.body.reklamlarurl,
      reklamlarurl2: req.body.reklamlarurl2,
      reklamlarurl3: req.body.reklamlarurl3,
      reklamlarurl4: req.body.reklamlarurl4,
    };
    const existingSite = await Reklam.findOne({});

    // Logo kontrolü ve güncelleme
    if (req.files && req.files.reklamlar && req.files.reklamlar.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/logo",
        req.files.reklamlar[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      reklamguncelle.reklamlar = req.files.reklamlar[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      reklamguncelle.reklamlar = existingSite.reklamlar;
    }

    // Logo kontrolü ve güncelleme
    if (req.files && req.files.reklamlar2 && req.files.reklamlar2.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/logo",
        req.files.reklamlar2[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      reklamguncelle.reklamlar2 = req.files.reklamlar2[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      reklamguncelle.reklamlar2 = existingSite.reklamlar2;
    }
    // Logo kontrolü ve güncelleme
    if (req.files && req.files.reklamlar3 && req.files.reklamlar3.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/logo",
        req.files.reklamlar3[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      reklamguncelle.reklamlar3 = req.files.reklamlar3[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      reklamguncelle.reklamlar3 = existingSite.reklamlar3;
    }
    // Logo kontrolü ve güncelleme
    if (req.files && req.files.reklamlar4 && req.files.reklamlar4.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/logo",
        req.files.reklamlar4[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      reklamguncelle.reklamlar4 = req.files.reklamlar4[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      reklamguncelle.reklamlar4 = existingSite.reklamlar4;
    }

    console.log(req.files);
    await Reklam.findOneAndUpdate({}, reklamguncelle);
    res.status(200).json({ msg: ["Güncelleme Başarılı"] });
  } catch (err) {
    console.log(err);
  }
};

exports.adminbilgi = async (req, res, next) => {
  _kullaniciyenisifre = await bcrypt.hash(req.body.uyesifre, 10);

  try {
    const adminbilgi = {
      uyemail: req.body.uyemail,
      uyesifre: _kullaniciyenisifre,
    };

    await uyeler.findOneAndUpdate({ _id: req.body.uyeId }, adminbilgi);
    res.status(200).json({ msg: ["Bilgileriniz Başarıyla Güncellendi."] });
  } catch (err) {
    console.log(err);
  }
};

exports.coinekle = async (req, res, next) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }
  const turkceKarakterMap = {
    ğ: "g",
    ü: "u",
    ş: "s",
    ı: "i",
    ö: "o",
    ç: "c",
  };
  let coinName = req.body.coinname;

  coinName = coinName.replace(/ /g, "-");
  for (let turkceKarakter in turkceKarakterMap) {
    const degisim = turkceKarakterMap[turkceKarakter];
    const regex = new RegExp(turkceKarakter, "g");
    coinName = coinName.replace(regex, degisim);
  }

  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  coinName += `-${randomNumber}`;

  try {
    const coinbilgi = new coins({
      name: req.body.coinname,
      symbol: req.body.symbol,
      network: req.body.network,
      description: req.body.codeblock,
      contract: req.body.contract,
      presaledate: req.body.presaledate,
      presaleenddate: req.body.presaleenddate,
      customchart: req.body.ozeldex,
      telegram: req.body.telegram,
      website: req.body.website,
      telegramchat: req.body.telegramgrup,
      email: req.body.email,
      discord: req.body.discord,
      presale: req.body.presale,
      coinmarketcap: req.body.coinmarketcap,
      coingecko: req.body.coingecko,
      status: req.body.aktif,
      coinUrl: coinName,
      kyc: req.body.kyc,
      audit: req.body.audit,
      promoted: req.body.promoted,
      presalelink: req.body.onsatislink,
    });

    // Logo kontrolü ve güncelleme
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/logo",
        req.files.logo[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      coinbilgi.logo = req.files.logo[0].filename;
    } else {
      // Logo eklenmediyse veritabanındaki değeri koru
      const existingSite = await site.findOne({});
      coinbilgi.logo = existingSite.favicon;
    }

    await coinbilgi.save();
    res.status(200).json({ msg: ["Ekleme Başarılı"] });
  } catch (err) {
    console.log(err);
  }
};

exports.puanisle = async (req, res, next) => {
  try {
    const coinId = req.body.coinId;
    const action = req.body.action;

    if (action === "arttir") {
      await Vote.create({ coinsId: coinId, vote: 1 });
    } else if (action === "azalt") {
      await Vote.findOneAndDelete({ coinsId: coinId });
    }
  } catch (err) {
    console.log(err);
  }
};

const Coin = require("../../database/coins");

exports.toggleStatus = async (req, res, next) => {
  try {
    const coinId = req.body.coinId;
    const status = req.body.status;

    const coin = await Coin.findOne({ _id: coinId });
    if (coin) {
      coin.status = status;
      await coin.save();
    }
  } catch (err) {
    console.log(err);
  }
};

exports.coinguncelle = async (req, res, next) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }
  try {
    const coinbilgi = {
      name: req.body.coinname,
      symbol: req.body.symbol,
      network: req.body.network,
      description: req.body.codeblock,
      contract: req.body.contract,
      presaledate: req.body.presaledate,
      presaleenddate: req.body.presaleenddate,
      customchart: req.body.ozeldex,
      telegram: req.body.telegram,
      website: req.body.website,
      telegramchat: req.body.telegramgrup,
      email: req.body.email,
      discord: req.body.discord,
      presale: req.body.presale,
      coinmarketcap: req.body.coinmarketcap,
      coingecko: req.body.coingecko,
      status: req.body.aktif,
      kyc: req.body.kyc,
      audit: req.body.audit,
      promoted: req.body.promoted,
      presalelink: req.body.onsatislink,
    };

    if (
      req.files &&
      req.files.logo &&
      req.files.logo.length > 0 &&
      req.files.logo[0].size > 0
    ) {
      const logoDosyaYolu = path.join(
        __dirname,
        "../../www/admin/coinimages",
        req.files.logo[0].filename,
      );
      // Dosyayı yüklemek için gereken işlemleri buraya ekleyin
      coinbilgi.logo = req.files.logo[0].filename;
    } else {
      // Logo eklenmediyse veya boyutu 0 ise var olan değeri koru
      const existingSite = await coins.findOne({ _id: req.body.coinsId });
      coinbilgi.logo = existingSite.logo; // veya req.body.logo (gereken değere göre değişir)
    }

    await coins.findOneAndUpdate({ _id: req.body.coinsId }, coinbilgi);

    res.status(200).json({ msg: ["Güncelleme Başarılı"] });
  } catch (err) {
    console.log(err);
  }
};

exports.nadminlogin = (req, res, next) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);
    res.status(400).json({ errors: errorMessage });
    return;
  }

  passport.authenticate(
    "local",
    { failureFlash: true, session: true, cookie: { maxAge: 86400 } },
    function (err, kullanici, info) {
      if (err) {
        res.status(400).json({ errors: ["Bir Hata Oluştu"] });
        return;
      }
      if (!kullanici) {
        console.log(kullanici);
        console.log(info.message); // Kullanıcı adı veya şifre hatalı mesajını kontrol et
        res
          .status(400)
          .json({ errors: ["Kullanıcı Adınız Veya Şifreniz Hatalı"] });
        return;
      }

      if (!kullanici.admin) {
        res.status(400).json({ errors: ["Admin Değilsiniz.."] });

        return;
      }

      req.login(kullanici, function (err) {
        if (err) {
          return next(err);
        }
        res
          .status(200)
          .json({ success: "Giriş Başarılı Tebrikler Yönlendiriliyorsunuz" });
      });
    },
  )(req, res, next);
};
