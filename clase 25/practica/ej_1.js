const express = require("express");
const session = require("express-session");
const cp = require("cookie-parser");

const app = express();

app.use(express.json());

app.use(cp());

app.use(
  session({
    secret: "richard",
    saveUninitialized: false,
    resave: true,
  })
);

const usuarios = [{ usuario: "richard", password: "coder" }];

const requiereAutenticacion = (req, res, next) => {
  if (req.session.nombreUsuario) return next();
  res.status(401).send("No estas autenticado");
};

const rechazaAutenticado = (req, res, next) => {
  if (req.session.nombreUsuario)
    return res.status(409).send("ya estas autenticado");
  next();
};

app.post("/login", rechazaAutenticado, (req, res) => {
  const { usuario, password } = req.body;
  const user = usuarios.find((usr) => usr.usuario === usuario);
  if (!user || user.password !== password)
    return res.status(401).send("usuario o password incorrectos");
  req.session.nombreUsuario = usuario;
  res.send("Bienvenido");
});

app.get("/datos", requiereAutenticacion, (req, res) => {
  res.send(req.session);
});

app.get("/logout", requiereAutenticacion, (req, res) => {
  req.session.destroy((err) => res.send("Deslogueado!"));
});

app.listen(8080, () => {
  console.log("Servidor escuchando!");
});
