const express = require("express");
const app = express();
const port = 8080;

const primerMiddleware = (req, res, next) => {
  console.log("pase por el primer middleware");
  next();
};

const segundoMiddleware = (req, res, next) => {
  console.log("pase por el segundo middleware");
  next();
};

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.use((req, res, next) => {
  console.log("pase por el middleware a nivel de aplicacion");
  next();
});

app.get("/ruta1", primerMiddleware, (req, res) => {
  res.send("ruta 1");
});

app.get("/ruta2", primerMiddleware, segundoMiddleware, (req, res) => {
  res.send("ruta 2");
});

app.get("/ruta3", (req, res, next) => {
  next(new Error('Hubo un error. Este es mi error.'));
});
