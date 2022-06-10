const express = require("express");
const carritoRouter = express.Router();

const Carrito = require("../controllers/carrito.js");

carritoRouter.post("/", (req, res) => {
  const carrito = new Carrito();
  const newCart = carrito.addCart();
  res.send({ carrito: newCart });
});

carritoRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = new Carrito();
  const cartByID = carrito.getByID(id);
  if (cartByID[0] != undefined) {
    res.send({ carrito: cartByID });
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.get("/:id/productos", (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = new Carrito();
  const cartByID = carrito.getByID(id);
  if (cartByID[0] != undefined) {
    if(cartByID[0].productos.length > 0) {
      res.send({ carritoConProductos: cartByID[0].productos });
    } else res.status(404).send({ error: "Carrito sin productos" }); 
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.get("/", (req, res) => {
  const carrito = new Carrito();
  const listadoCarritos = carrito.getAll();
  res.send({ carritos: listadoCarritos });
});

carritoRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);  
  const carrito = new Carrito();
  const deleted = carrito.deleteCart(id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "Carrito eliminado" });
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.post("/:id/productos", (req, res) => {
  const cart_id = parseInt(req.params.id);  
  const product_id = parseInt(req.body.id);
  const carrito = new Carrito();  
  const Cart = carrito.addProduct(cart_id, product_id);
  res.send({ carrito: Cart });
});

carritoRouter.delete("/:cart_id/productos/:product_id", (req, res) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.params.product_id);
  const carrito = new Carrito();
  const deleted = carrito.deleteProduct(cart_id,product_id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "producto eliminado" });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

module.exports = {carritoRouter};
