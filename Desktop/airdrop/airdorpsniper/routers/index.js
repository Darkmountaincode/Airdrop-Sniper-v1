module.exports = function () {
  require("../functions/middleware")(this);
  app.use("/", require("../routers/home"));
  app.use("/", require("../routers/admin"));
};
