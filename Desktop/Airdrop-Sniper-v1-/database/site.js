const site = new Schema(
  {
    url: { type: String, default: "localhost" },
    title: { type: String, default: "Airdrop" },
    description: { type: String, default: "airdrop sniper coin submit" },
    keywords: { type: String, default: "crypto, cryptocurrency, airdrop" },
    logo: { type: String, default: "logo/722059.svg" },
    favicon: { type: String, default: "img/favicon.svg" },
    googleanalytics: { type: String, default: "" },
    banner1: {
      type: String,
      default:
        "https://storage.googleapis.com/coinsniper-assets/images/MyQjR1yi9Abq7twzJGNmZ0JltDvC9ecutlSr3uk9.gif",
    },
    banner1url: { type: String, default: "localhost" },
    banner2: {
      type: String,
      default:
        "https://storage.googleapis.com/coinsniper-assets/images/MyQjR1yi9Abq7twzJGNmZ0JltDvC9ecutlSr3uk9.gif",
    },
    banner2url: { type: String, default: "localhost" },
    banner3: {
      type: String,
      default:
        "https://storage.googleapis.com/coinsniper-assets/images/Tukp9AtwT9SAcpONAN44CFPbAfuNvuJRI7bgcDxI.png",
    },
    banner3url: { type: String, default: "localhost" },
    banner4: {
      type: String,
      default:
        "https://storage.googleapis.com/coinsniper-assets/images/XJdPuF4dESL06zfXz2LhKBpng67Ap3M6bgVrrkIN.png",
    },
    banner4url: { type: String, default: "localhost" },
    mobilebanner4: {
      type: String,
      default:
        "https://storage.googleapis.com/coinsniper-assets/images/AqwQD4Ma1Shr2KnyM26duphGN6npJwtNC9Jx8L2H.png",
    },
    banner5: { type: String, default: "" },
    banner5url: { type: String, default: "localhost" },
    mobilebanner5: { type: String, default: "" },
    maintenance: {
      status: { type: Boolean, default: true },
      message: { type: String, default: "Our site is under maintenance." },
    },
    captcha: {
      service: { type: Boolean, default: false },
      key: { type: String, default: "" },
      secretkey: { type: String, default: "" },
      status: { type: Boolean, default: false },
    },
    socialmedia: {
      twitter: { type: String, default: "https://twitter.com" },
      discord: { type: String, default: "https://discord.gg" },
      telegram: { type: String, default: "https://t.me/" },
      instagram: { type: String, default: "https://instagram.com" },
    },
  },
  { collection: "site" },
);

module.exports = mongoDB.model("site", site);
