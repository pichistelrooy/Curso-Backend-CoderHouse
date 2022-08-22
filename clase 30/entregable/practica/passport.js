import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import mongoDB from "./persistencia/mongoDB.js";
import User from "./model/user.js";

passport.use(
  "login",
  new LocalStrategy(async (username, password, callback) => {
    const mongo = new mongoDB();
    let user = new User(username, password);
    const userLogArray = await mongo.login(user);
    const userLog = userLogArray[0];
    if (!userLog || !bcrypt.compareSync(password, userLog.password))
      return callback();
    callback(null, userLog);
  })
);

passport.use(
  "register",
  new LocalStrategy(async (username, password, callback) => {
    const mongo = new mongoDB();
    const userfind = await mongo.find(username);
    if (userfind[0]) return callback();

    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = new User(username, passwordHasheado);
    await mongo.register(user);
    callback(null, user);
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user.email);
});

passport.deserializeUser(async (username, callback) => {
  const mongo = new mongoDB();
  const user = await mongo.find(username);
  callback(null, user);
});

export default passport;
