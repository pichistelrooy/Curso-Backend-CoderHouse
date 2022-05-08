const express = require("express");

const app = express();
const port = 8080;

let cantidadVisitas = 0;

const server = app.listen(port, () => {
  console.log();
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  cantidadVisitas++;
  res.send('<h1 style="color: blue;">Bienvenidos al servidor express</h1>');
});

app.get("/visitas", (req, res) => {
  cantidadVisitas++;
  res.send(`La cantidad de visitas es ${cantidadVisitas}`);
});

app.get("/fyh", (req, res) => {
  cantidadVisitas++;
  res.send({ fy: new Date() });
});
