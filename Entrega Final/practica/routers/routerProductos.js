const express = require("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

const Productos = require("../controllers/productos.js");

const middlewareAutorizacion = (req, res, next) => {
  if (req.body.isAdmin > 0) next();
  else res.status(403).send("you do not have permission to view this page");
};

productRouter.get("/", (req, res) => {
  const productos = new Productos();
  const listadoProductos = productos.getAll();
  res.send({ productos: listadoProductos });
});

productRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productos = new Productos();
  const productByID = productos.getByID(id);
  if (productByID[0] != undefined) {
    res.send({ producto: productByID });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

productRouter.post("/", middlewareAutorizacion, (req, res) => {
  const productos = new Productos();
  const product = req.body;
  const newProduct = productos.add(product);
  res.send({ producto: newProduct });
});

productRouter.put("/:id", middlewareAutorizacion, (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const productos = new Productos();
  const putProduct = productos.update(id, product);
  if (putProduct[0] != undefined) {
    res.send({ producto: putProduct });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

productRouter.delete("/:id", middlewareAutorizacion, (req, res) => {
  const id = parseInt(req.params.id);
  const productos = new Productos();
  const deleted = productos.delete(id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "producto eliminado" });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

module.exports = { productRouter };
