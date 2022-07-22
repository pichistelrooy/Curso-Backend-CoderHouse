const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoDB = require("./persistencia/mongoDB.js");
const User = require("./model/user");

passport.use('auth', new LocalStrategy(async (email, password, callback) => {
  /*const mongo = new mongoDB();
  console.log(`conecto a mongo`);
  let user = new User(email, password);
  console.log('creo el usuario');
  const usercol = await mongo.login(user);  
  const userLog = usercol[0]
  if (!userLog || !bcrypt.compareSync(password, userLog.password)) return callback();
  return callback(null, userLog);*/
}));

/*passport.use(
  "register",
  new LocalStrategy((email, password, callback) => {
    const user = users.find((usuario) => usuario.email === email);
    if (user) return callback(new Error("Ya existe un usuario con ese email"));
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = { email, password: passwordHasheado };
    users.push(usuarioCreado);
    callback(null, usuarioCreado);
  })
);

passport.use(
  "autenticacion",
  new LocalStrategy(async (email, password, callback) => {    
    const mongo = new mongoDB();
    console.log('conecto a mongo');
    let user = new User(email, password);
    console.log('creo el usuario');
    const usercol = await mongo.login(user);
    console.log('a ver si logueo');
    console.log(usercol);
    //if (!user || !bcrypt.compareSync(password, user.password))
    /f (!user)
      return callback(new Error("Usuario no existente o password incorrecto"));
    callback(null, user);
  })
);

passport.use(
  "auth",
  new LocalStrategy(async (username, password, callback) => {
    const userLogArray = await mongoUsers.findUser(username);
    const userLog = userLogArray[0];
    if (!userLog || !bcrypt.compareSync(password, userLog.password))
      return callback();
    callback(null, userLog);
  })
);*/

/*
  Candot engo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/
passport.serializeUser((usuario, callback) => {
  callback(null, usuario.email);
});

/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/
passport.deserializeUser((email, callback) => {
  const user = users.find((usr) => usr.email == email);
  callback(null, user);
});

module.exports = passport;
