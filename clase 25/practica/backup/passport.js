const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const users = [{ username: "richard", password: "richpassword" }];

passport.use(
  "registro",
  new LocalStrategy(async (username, password, callback) => {
    try {
      console.log(`Error`);
      const user = users.find((user) => user.username === username);
      if (user.length > 0) {
        return callback();
      }
      const passHash = bcrypt.hashSync(password, genSaltSync(10));
      const newUser = { username, password: passHash };
      users.push({ username, password });
      callback(null, newUser);
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "login",
  new LocalStrategy((username, password, callback) => {
    const user = users.find((user) => user.username === username);
    if (!user) callback(null, false, { message: "the username not exists" });
    if (user.password !== password) callback(null, false);
    if (user.password === password) callback(null, user);
  })
);

passport.use(
  "signup",
  new LocalStrategy((username, password, callback) => {
    console.log(username);
    const user = users.find((user) => user.username === username);
    if (user)
      callback(null, false, { message: "the username is already taken" });
    users.push({ username, password });
    callback(null, { username, password });
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((sessUser, callback) => {
  const user = users.find((user) => user.username === sessUser.username);
  callback(null, user);
});

module.exports = passport;
