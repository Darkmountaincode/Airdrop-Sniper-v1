const passport = require("passport");

module.exports = function () {
  const sessionStore = new mongoDBStore({
    uri: config.mongoDB,
    collection: "sessions",
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.set("view engine", "ejs");
  app.set("views", "www");

  app.use("/home", express.static("www/home/assets"));
  app.use(express.static("www/home/pages"));
  app.use("/ajax", express.static("www/home/ajax"));
  app.use("/sitebilgi", express.static("www/admin/ajax"));
  app.use("/admin", express.static("www/admin/assets"));
  app.use(express.static("www/admin/pages"));
  app.use("/coinimages", express.static("www/home/coinimages"));
  app.use("/logo", express.static("www/admin/logo"));

  app.use(
    session({
      secret: config.mongoDB,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 36000000,
      },
      store: sessionStore,
    }),
  );

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.validation_error = req.flash("validation_error");
    res.locals.success_message = req.flash("success_message");
    res.locals.baslik = req.flash("baslik");

    next();
  });
};
