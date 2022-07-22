const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const { TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET } = process.env;

const users = {}

passport.use(new TwitterStrategy({
  callbackURL: 'http://localhost:3000/auth/twitter/callback',
  consumerKey: TWITTER_CLIENT_ID,
  consumerSecret:TWITTER_CLIENT_SECRET
}, (accessToken, refreshToken, profile, callback) => {
  const { id, username } = profile;
  users[id] = { username };
  callback(null, { id, username });
}));

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  callback(null, users[id])
});

module.exports = passport;