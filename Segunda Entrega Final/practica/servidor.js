//let {MongoDB, Firebase, MariaDB, MySQL, DataFile, Memory} = await import('./configs.js');

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const { productRouter } = require("./routers/routerProductos.js");
const { carritoRouter } = require("./routers/routerCarrito.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);
app.use("/api/carrito", carritoRouter);

const moment = require("moment");
const fechaActual = moment();

//if MongoDB() == true then
// seteo coenxion MongoDB
//if Firebase() == true then
// seteo coenxion Firebase
//if MariaDB() == true then
// seteo coenxion MariaDB
//if SqLite() == true then
// seteo coenxion SqLite
//if DataFile() == true then
// seteo coenxion DataFile
//if Memory() == true then
// seteo coenxion Memory

/*const optionsSqLite = {
  filename: "./ecommerce/mydb.sqlite",
};
const client = "sqlite3";

// creo bd sqLite
async function crearBDsqLite() {
  const sqlite = new sqLite(client, optionsSqLite);
  await sqlite.crearBD();
}

// llamo a sqLite e inicializo tabla messages
crearBDsqLite();*/

const mongoose = require("mongoose");

const ejecutar = async () => {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
  console.log("Estamos conectados");

  /*const carritoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    productos: { type: Array, required: false },
  });

  const Carrito = mongoose.model("carrito", carritoSchema);
  const carrito = new Carrito({id: 1, timestamp: fechaActual, productos: []});
  let carritoSave = await carrito.save();
  console.log(carritoSave);
  console.log("Proceso terminado");  */
  await mongoose.connection.db.dropDatabase();
  console.log("db eliminada");
};

ejecutar();

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
