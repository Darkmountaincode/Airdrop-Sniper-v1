global.mongoose = require("mongoose");
global.express = require("express");
global.config = require("./config");
global.flash = require("connect-flash");
global.ejs = require("ejs");
global.passport = require("passport");
global.app = express();
global.session = require("express-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
global.mongoDBStore = require("connect-mongodb-session")(session);
global.Schema = mongoose.Schema;
global.moment = require("moment");
global.bcrypt = require("bcrypt");
global.multer = require("multer");
global.path = require("path");
global.crypto = require("crypto");

global.mongoDB = mongoose
  .createConnection(config.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .addListener("connected", () => {
    console.log("Veritabanı Bağlantısı Başarılı");
  })
  .addListener("disconnected", () => {})
  .addListener("error", (err) => {
    console.log(`${err} Veritabanı Bağlantısı Başarısız`);
  });

global.siteModel = require("./database/site");
global.airdropModel = require("./database/airdrop");
global.homepagesModel = require("./database/homepages");
global.adsModel = require("./database/ads");
global.uyeModel = require("./database/uyeler");
global.siteData;
(async () => {
  let site = await siteModel.countDocuments();
  let airdrop = await airdropModel.countDocuments();
  let homepage = await homepagesModel.countDocuments();
  let ads = await adsModel.countDocuments();
  let uyeler = await uyeModel.countDocuments();

  if (site === 0) {
    const defaultSiteData = new siteModel().site; // siteModel() ile boş bir siteModel örneği oluşturup, site verilerine erişebilirsiniz

    const newSite = new siteModel(defaultSiteData); // Varsayılan site verilerini kullanarak yeni bir siteModel örneği oluşturun

    await newSite.save(); // Yeni siteModel örneğini kaydedin
  }
  if (airdrop === 0) {
    const defaultAirdropData = new airdropModel().airdrop;

    const newAirdrop = new airdropModel(defaultAirdropData);

    await newAirdrop.save();
  }
  if (homepage === 0) {
    const defaultHomepageDate = new homepagesModel().homepage;

    const newHomepage = new homepagesModel(defaultHomepageDate);

    await newHomepage.save();
  }
  if (ads === 0) {
    const defaultAdsData = new adsModel().ads;

    const newAdsPage = new adsModel(defaultAdsData);

    await newAdsPage.save();
  }
  if (uyeler === 0) {
    const defaultUyelerData = new uyeModel().uyeler;

    const newUyelerPage = new uyeModel(defaultUyelerData);

    await newUyelerPage.save();
  }
})();

require("./routers/index")(this);

app.listen(config.PORT, () => {
  console.log(`${config.PORT} Bağlantısı Başarılı`);
});
