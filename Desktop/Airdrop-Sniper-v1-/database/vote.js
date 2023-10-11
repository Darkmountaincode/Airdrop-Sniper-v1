const vote = new Schema(
  {
    coinsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coins",
    },
    vote: { type: Number },
    createdAt: {
      type: String,
      default: moment().format("DD MMMM YYYY HH:mm:ss"),
    },
  },
  { collection: "vote" },
);

module.exports = mongoDB.model("vote", vote);
