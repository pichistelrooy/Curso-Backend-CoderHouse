const express = require("express");
const session = require("express-session");
const passport = require("./passport");
const rutas = require("./rutas");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "miSecreto",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("autenticacion", { failureRedirect: '/', failureMessage: true }), rutas.bienvenida);

app.post(
  "/registro",
  passport.authenticate("registracion"),
  rutas.registracion
);

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(8080, () => {
  console.log("Escuchando!");
});
