const users = new Schema(
  {
    username: { type: String, default: "admin" },
    userpassword: {
      type: String,
      default: "$2a$12$OSF0N6jWGbU5Z1ktRpPrqeLQxxBbswYk3hC1XSumHeGJ47RqmyF8a",
    },
    usermail: { type: String, default: "example@demo.com" },
    date: { type: String, default: moment().format("DD MMMM YYYY HH:mm:ss") }, // son kontrol tarihi
  },
  { collection: "users" },
);

module.exports = mongoDB.model("users", users);
