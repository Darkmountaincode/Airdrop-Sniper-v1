const airdrop = new Schema(
  {
    baslik: { type: String, default: "Weekly Airdrop #1:" },
    saribaslik: { type: String, default: "Test" },
    altbaslik: {
      type: String,
      default: "This week 0.6 BNB will be airdropped to a lucky winner.",
    },
    baslangic: { type: String, default: "Start: June 25st" },
    bitis: { type: String, default: "End: July 2th" },
    butonadi: { type: String, default: "Airdrops" },
    url: { type: String, default: "localhost" },
  },
  { collection: "airdrop" },
);

module.exports = mongoDB.model("airdrop", airdrop);
