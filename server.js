const express = require("express") ;
const dotenv = require("dotenv") ;
const mongoose = require("mongoose") ;
const path = require("path");
const passport = require("passport") ;
const flash = require("connect-flash");
const MongoStore = require("connect-mongo").default ;
const session = require("express-session");
const cors = require("cors") ;
const userRoutes = require("./routes/user") ;
const webhookRoutes = require("./routes/webhook") ;
const faqRoutes = require("./routes/faq")

//start application
const app = express()
dotenv.config();
// connect to database
let DB_URL = process.env.DB_url; // Changed from DB_URL to DB_url to match your .env file
mongoose
  .connect(DB_URL)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err.message));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 
// config ejs view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 

app.use(
  session({
    secret: process.env.SESSION_SECRET || "Danilosessionsecret",

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: DB_URL,
    }),
 
    cookie: {
      maxAge: 180 * 60 * 1000,
    },
  })
);
app.use(flash());
require("./middleware/passport")
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  const successMsg = req.flash("success");
  const errMsg = req.flash("error");

  return res.render("screens/index", {
        hasErr: errMsg.length > 0,
        hasSuccess: successMsg.length > 0,
        errMsg: errMsg,
        successMsg: successMsg,
  });
});
app.use("/user", userRoutes);
app.use("/api/webhook", webhookRoutes); 
app.use("/FAQ", faqRoutes)



let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listen on port ${port}`);
});

// 404 handler - This should come after all your routes
app.use((req, res, next) => {
  res.status(404).render("errors/404", {
    error: { message: `Cannot ${req.method} ${req.url}` },
  });
});

// General error handler - should be after all other middleware and routes
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);

  // If it's an AJAX request, send JSON
  if (req.xhr) {
    return res.json({ error: err.message });
  }

  // Otherwise render error page
  res.render("errors/500", {
    error: { message: err.message || "Internal Server Error" },
  });
});