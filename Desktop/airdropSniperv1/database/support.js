const support = new Schema(
  {
    username: { type: String },
    email: { type: String },
    wrightsubject: { type: String },
    message: { type: String },
  },
  { collection: "support" },
);

module.exports = mongoDB.model("support", support);
