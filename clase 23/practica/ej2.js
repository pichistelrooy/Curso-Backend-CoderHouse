const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

// for invalid routes
app.use(function (req, res) {
  res.json({
    error: "-2",
    description: `route ${req.originalUrl} method ${req.method} not implemented`,
  });
});

app.use(
  session({
    secret: "marcos",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/setearsesion", (req, res) => {
  req.session.admin = true;
  req.session.userId = "marcos";
  res.send("sesion seteada");
});

app.get("/obtenersesion", (req, res) => {
  const { userId, admin } = req.session;
  res.send(userId, admin);
});
