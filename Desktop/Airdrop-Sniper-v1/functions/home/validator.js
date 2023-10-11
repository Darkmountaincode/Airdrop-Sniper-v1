const { body } = require("express-validator");

exports.sitebilgi = () => {
  return [
    body(
      "name",
      "Your coin name can be a minimum of 5 characters and a maximum of 30 characters.",
    ).isLength({ min: 5, max: 30 }),
    body(
      "symbol",
      "Your Symbol name can be a minimum of 2 characters and a maximum of 10 characters",
    ).isLength({ min: 2, max: 10 }),
    body("contract").custom((value) => {
      const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;

      if (!walletAddressRegex.test(value)) {
        throw new Error("Please enter a valid cryptocurrency wallet address.");
      }
      return true;
    }),
    body(
      "description",
      "Your Description can be a minimum of 50 characters and a maximum of 3000 Charackter",
    ).isLength({ min: 50, max: 3000 }),
  ];
};

exports.support = () => {
  return [
    body("username", "Please do not leave your name blank.").notEmpty(),
    body("emails", "Please do not leave your email blank.").isEmail(),
    body(
      "wrightsubject",
      "Please do not leave your wrightsubject blank",
    ).notEmpty(),
    body("message", "Please do not leave your message blank.").notEmpty(),
  ];
};
