const uyeler = new Schema(
  {
    uyemail: { type: String, default: "admin@admin.com" },
    uyesifre: {
      type: String,
      default: "$2a$12$I51ml2Didy3hP20ZLFX2kOmLMK9IFddNphHVb00o/kfPao5h6iHVW",
    },
    admin: { type: Boolean, default: true },
    uyekayittarihi: {
      type: String,
      default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  },
  { collection: "uyeler" },
);

module.exports = mongoDB.model("uyeler", uyeler);
