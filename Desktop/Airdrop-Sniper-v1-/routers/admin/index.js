const routers = require("express").Router();
const sites = require("../../database/site");
const coin = require("../../database/coins");
const functions = require("../../functions/admin/functions");
const airdrops = require("../../database/airdrop");
const homepages = require("../../database/homepages");
const resimler = require("../../functions/admin/multer");
const reklam = require("../../database/ads");
const resimlerhome = require("../../functions/home/multer");
const Vote = require("../../database/vote");
const auth = require("../../functions/admin/auth");
const admins = require("../../database/uyeler");
const support = require("../../database/support");
const fs = require("fs");

routers.get("/nadminpanel", auth.oturumacilmis, async (req, res) => {
  const site = await sites.find();

  res.render("admin/pages/index", { site });
});

routers.get("/nadminpanel/yetki", auth.oturumacilmis, async (req, res) => {
  const admin = await admins.findOne({});
  const site = await sites.find();
  res.render("admin/pages/admin", { admin: admin, site });
});

routers.get("/nadminpanel/support", auth.oturumacilmis, async (req, res) => {
  const site = await sites.find();
  const supports = await support.find();
  res.render("admin/pages/support", { site, supports });
});

routers.get("/nadminpanel/reklamlar", auth.oturumacilmis, async (req, res) => {
  const site = await sites.findOne();
  const reklamlar = await reklam.findOne();
  res.render("admin/pages/reklamlar", { site, reklamlar });
});

routers.get("/nadminpanel/site", auth.oturumacilmis, async (req, res) => {
  const site = await sites.findOne();
  const homepage = await homepages.findOne();
  res.render("admin/pages/sitebilgileri", { site, homepage });
});

routers.get(
  "/nadminpanel/ads",
  auth.oturumacilmis,
  auth.oturumacilmis,
  async (req, res) => {
    const site = await sites.findOne();
    res.render("admin/pages/reklamlar", { site });
  },
);

routers.get("/nadminpanel/airdrop", auth.oturumacilmis, async (req, res) => {
  const site = await sites.findOne();
  const airdrop = await airdrops.findOne();
  res.render("admin/pages/airdrop", { site, airdrop });
});

routers.get("/nadminpanel/coins", auth.oturumacilmis, async (req, res) => {
  try {
    const site = await sites.findOne();
    const coins = await coin.find();
    const coinsWithTotalVote = await Promise.all(
      coins.map(async (coin) => {
        const votes = await Vote.find({ coinsId: coin._id });
        const totalVote = votes.reduce((total, vote) => total + vote.vote, 0);
        return { ...coin._doc, totalVote };
      }),
    );
    res.render("admin/pages/coins", { site, coins: coinsWithTotalVote });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

routers.get("/nadminpanel/coins_edit", auth.oturumacilmis, async (req, res) => {
  try {
    const coinId = req.query.id;
    const site = await sites.findOne();
    const coins = await coin.findById(coinId);

    res.render("admin/pages/coins_edit", { site, coins });
  } catch (err) {
    console.log(err);
  }
});

routers.get("/nadminpanel/coin-ekle", auth.oturumacilmis, async (req, res) => {
  const site = await sites.findOne();
  res.render("admin/pages/coin-ekle", { site });
});

routers.get("/nadminpanel/login", auth.oturumacilmamis, async (req, res) => {
  const site = await sites.findOne({});

  res.render("admin/pages/login", { site });
});

//////// POST ////////////////////////////////////

routers.post("/nadminpanel/nadminlogin", functions.nadminlogin);

routers.post(
  "/nadminpanel/sitekaydet",
  resimler.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
  ]),
  functions.sitebilgileri,
);

routers.post(
  "/nadminpanel/reklamguncelle",
  resimler.fields([
    { name: "reklamlar", maxCount: 1 },
    { name: "reklamlar2", maxCount: 1 },
    { name: "reklamlar3", maxCount: 1 },
    { name: "reklamlar4", maxCount: 1 },
  ]),
  functions.reklamguncelle,
);

routers.post("/nadminpanel/sil", function (req, res) {
  var gorselAdi = req.body.gorselAdi;

  // Görseli silmek için gerekli işlemleri buraya ekleyin
  // Örneğin, `fs` modülünü kullanarak görseli diske kaydedilen dizinden silin
  var gorselDosyaYolu = path.join(
    __dirname,
    "../../www/home/coinimages",
    gorselAdi,
  );
  fs.unlink(gorselDosyaYolu, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Görsel silinirken bir hata oluştu.");
    } else {
      res.status(200).send("Görsel başarıyla silindi.");
    }
  });
});

routers.post(
  "/nadminpanel/coinekle",
  resimlerhome.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {},
  ]),
  functions.coinekle,
);

routers.post("/nadminpanel/adminbilgi", functions.adminbilgi);

routers.post(
  "/nadminpanel/coinguncelle",
  resimlerhome.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {},
  ]),
  functions.coinguncelle,
);

routers.post("/nadminpanel/puanisle", functions.puanisle);

routers.post("/nadminpanel/togglestatus", functions.toggleStatus);

routers.post("/nadminpanel/airdrops", functions.airdrops);

routers.post("/nadminpanel/anasayfaayar", functions.anasayfaayar);

routers.delete("/nadminpanel/coins/coinsil/:id", (req, res) => {
  const coinId = req.params.id;
  coin
    .findByIdAndDelete(coinId)
    .then(() => {
      // Coin başarıyla silindi, şimdi ona ait tüm voteleri silme işlemini gerçekleştirelim
      Vote.deleteMany({ coinsId: coinId })
        .then(() => {
          res.status(200).json({ success: ["Silme İşlemi Başarılı"] });
        })
        .catch((err) => {
          res.status(500).json({ success: ["Silme İşlemi Başarısız"] });
        });
    })
    .catch((err) => {
      res.status(500).json({ success: ["Silme İşlemi Başarısız"] });
    });
});

module.exports = routers;
