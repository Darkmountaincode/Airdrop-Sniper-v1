const reklamlar = new Schema(
  {
    reklamlar: { type: String, default: "" },
    reklamlarurl: { type: String, default: "" },
    reklamlar2: { type: String, default: "" },
    reklamlarurl2: { type: String, default: "" },
    reklamlar3: { type: String, default: "" },
    reklamlarurl3: { type: String, default: "" },
    reklamlar4: { type: String, default: "" },
    reklamlarurl4: { type: String, default: "" },
  },
  { collection: "reklamlar" },
);

module.exports = mongoDB.model("reklamlar", reklamlar);
