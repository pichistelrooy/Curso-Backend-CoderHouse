const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const users = [];

passport.use(
  "registracion",
  new LocalStrategy((username, password, callback) => {
    const user = users.find((usuario) => usuario.username === username);
    if (user) return callback(new Error("Ya existe un usuario con ese nombre"));
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = { username, password: passwordHasheado };
    users.push(usuarioCreado);
    callback(null, usuarioCreado);
  })
);

passport.use(
  "autenticacion",
  new LocalStrategy((username, password, callback) => {
    const user = users.find((usuario) => usuario.username === username);
    if (!user || !bcrypt.compareSync(password, user.password))
      return callback(new Error("Usuario no existente o password incorrecto"));
    callback(null, user);
  })
);

/*
  Candot engo que escribir una sesion, me pasan req.user y elijo
  que guardar en la sesion, en este caso es el username.
*/
passport.serializeUser((usuario, callback) => {
  callback(null, usuario.username);
});

/*
  Cuando tengo que leer una sesion, agarro lo que esta en la sesion
  y decido como reconstruir req.user
*/
passport.deserializeUser((username, callback) => {
  const user = users.find((usr) => usr.username == username);
  callback(null, user);
});

module.exports = passport;
