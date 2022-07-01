require('dotenv').config();

const express = require("express");
const productRouter = express.Router();

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

let DaoProductos = '';
function obtenerAPI(){
  if(process.env.API == "MEMORY") {
    DaoProductos = require("./../dao/producto/ProductoDaoMemory");
  } else if(process.env.API == "FILEDATA") {
    DaoProductos = require("./../dao/producto/ProductoDaoFileData");
  } else if(process.env.API == "MONGODB"){
    DaoProductos = require("./../dao/producto/ProductoDaoMongoDB");
  } else{
    DaoProductos = require("./../dao/producto/ProductoDaoFirebase");
  };
}

const middlewareAutorizacion = (req, res, next) => {
  if (req.body.isAdmin > 0) next();
  else res.status(403).send("you do not have permission to view this page");
};

productRouter.get("/", async (req, res) => {
  obtenerAPI()
  const productos = new DaoProductos();
  const listadoProductos = await productos.getAllProducts();
  res.send({ productos: listadoProductos });
});

productRouter.get("/:id", async (req, res) => {
  obtenerAPI()
  const id = parseInt(req.params.id);
  const productos = new DaoProductos();
  const productByID = await productos.getProductByID(id);
  if (productByID[0] != undefined) {
    res.send({ producto: productByID });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

productRouter.post("/", middlewareAutorizacion, async (req, res) => {
  obtenerAPI()
  const productos = new DaoProductos();
  const product = req.body;
  const newProduct = await productos.addProduct(product);
  res.send({ producto: newProduct });
});

productRouter.put("/:id", middlewareAutorizacion, async (req, res) => {
  obtenerAPI()
  const id = parseInt(req.params.id);
  const product = req.body;
  const productos = new DaoProductos();
  const putProduct = await productos.updateProduct(id, product);
  if (putProduct) {
    res.send({ mensaje: 'Producto modificado' });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

productRouter.delete("/:id", middlewareAutorizacion, async (req, res) => {
  obtenerAPI()
  const id = parseInt(req.params.id);
  const productos = new DaoProductos();
  const deleted = await productos.deleteProduct(id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "producto eliminado" });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

module.exports = { productRouter };
