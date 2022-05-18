const express = require("express");
const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

// req.params  cuando vienen por URL los parametros
app.get("/api/sumar/:numUno/:numDos", (req, res) => {
  const total = parseInt(req.params.numUno) + parseInt(req.params.numDos);
  res.send({ total });
});

// req.query  cuando vienen por querystring
app.get("/api/sumar", (req, res) => {
  const total = parseInt(req.query.num1) + parseInt(req.query.num2);
  res.send({ total });
});

// req.query  cuando vienen por querystring
app.get("/api/operacion/:operacion", (req, res) => {
  const numeros = req.params.operacion.split("+");
  const total = parseInt(numeros[0]) + parseInt(numeros[1]);
  res.send({ total });
});

app.post("/api", (req, res) => {
  res.send("OK POST");
});

app.put("/api", (req, res) => {
  res.send("OK PUT");
});

app.delete("/api", (req, res) => {
  res.send("OK DELETE");
});
