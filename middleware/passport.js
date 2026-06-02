const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userService = require("../services/user") ;
const argon = require("argon2");



passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.getUserById(id);
  
  if (user) {
    return done(null, user);
  }
  let msg = " not found";
  return done(msg);
});


passport.use(
  "user.login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let errMsg = [];
      try {
        const foundUser = await userService.getUserByEmail(email);
        if (!foundUser) {
          let message = "no User found with this email";
          errMsg.push(message);
          return done(null, false, req.flash("error", errMsg));
        }
        let isPasswordCorrect = await argon.verify(
          foundUser.password,
          password
        );

        if (!isPasswordCorrect) {
          let message = "incorrect password";
          errMsg.push(message);
          return done(null, false, req.flash("error", errMsg));
        }
        return done(null, foundUser);
      } catch (err) {
        errMsg.push(err.message);
        return done(null, false, req.flash("error", errMsg));
      }
    }
  )
);