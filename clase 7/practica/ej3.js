const express = require("express");
const app = express();
const port = 8081;
const fraseInicial = "Frase inicial";
let palabras = fraseInicial.split(" ");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/api/frase", (req, res) => {
  res.send(palabras.join(" "));
});

app.get("/api/palabras/:pos", (req, res) => {
  const posicion = parseInt(req.params.pos);
  res.send(palabras[posicion]);
});

app.post("/api/palabras", (req, res) => {
  const agregar = req.body.palabra;
  palabras.push(agregar);
  res.json({
    agregada: agregar,
    pos: palabras.length - 1,
  });
});

app.put("/api/palabras/:pos", (req, res) => {
  const palabra = req.body.palabra;
  const posicion = parseInt(req.params.pos);
  const anterior = palabras[posicion];
  palabras[posicion] = palabra;
  res.json({
    actualizada: palabra,
    anterior: anterior,
  });
});

app.delete("/api/palabras/:pos", (req, res) => {    
    const posicion = parseInt(req.params.pos);
    const anterior = palabras[posicion];
    palabras = palabras.filter((valor, indice) => indice != posicion);
    res.json({
      eliminada: anterior,
      palabras: palabras.join(' '),
    });
});
