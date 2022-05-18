const express = require("express");
const app = express();
const port = 8080;
const frase = "Hola mundo cómo están";

const server = app.listen(port, () => {
  console.log("Servidor On!");
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/api/frase", (req, res) => {
  res.send(frase);
});

app.get("/api/letras/:num", (req, res) => {
  const num = parseInt(req.params.num);
  if (!num) res.status(404).send({ error: "No es un número" });
  if (num > frase.length || num < 1)
    res.status(404).send({ error: "Fuera de rango" });
  else res.send(frase[num - 1]);
});

app.get("/api/palabras/:num", (req, res) => {
  const num = parseInt(req.params.num);
  const palabras = frase.split(" ");
  if (!num) res.status(404).send({ error: "No es un número" });
  if (num > palabras.length || num < 1)
    res.status(404).send({ error: "Fuera de rango" });
  else res.send(palabras[num - 1]);
});
