const express = require("express");

const app = express();
const port = 8080;
const Contenedor = require("./contenedor.js");
const Productos = "./Productos.txt";

const server = app.listen(port, () => {
  console.log("Servidor On!");
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.send(
    '<h1 style="color: blue;">Bienvenidos al Entregable 3 de Marcos Piccolini!</h1>'
  );
});

app.get("/productos", (req, res) => {
  const contenedor = new Contenedor(Productos);
  contenedor
    .getAll()
    .then((productos) => {
      res.send(
        `<h1 style="color: red;">Productos: </h1> ${JSON.stringify(productos)}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/productoRandom", (req, res) => {
  const contenedor = new Contenedor(Productos);
  contenedor
    .getRandom()
    .then((producto) => {
      res.send(
        `<h1 style="color: black;">Producto Random: </h1> ${JSON.stringify(
          producto
        )}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
});
