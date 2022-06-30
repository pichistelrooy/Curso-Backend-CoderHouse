const express = require("express");
const carritoRouter = express.Router();

//const DaoCarrito = require("./../dao/carrito/CarritoDaoFileData");
//const DaoCarrito = require("./../dao/carrito/CarritoDaoMemory");
const DaoCarrito = require("./../dao/carrito/CarritoDaoMongoDB");

carritoRouter.get("/", async (req, res) => {
  const carrito = new DaoCarrito();
  let listadoCarritos = await carrito.getAllCarts();
  res.send({ carritos: listadoCarritos });
});

carritoRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = new DaoCarrito();
  const cartByID = await carrito.getCartByID(id);
  if (cartByID[0] != undefined) {
    res.send({ carrito: cartByID });
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.post("/", async (req, res) => {
  const carrito = new DaoCarrito();
  const newCart = await carrito.addCart();
  res.send({ carrito: newCart });
});

carritoRouter.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = new DaoCarrito();
  const deleted = await carrito.deleteCart(id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "Carrito eliminado" });
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.post("/:id/productos", async (req, res) => {
  const cart_id = parseInt(req.params.id);
  const product_id = parseInt(req.body.id);
  const carrito = new DaoCarrito();
  const Cart = await carrito.addProductToCart(cart_id, product_id);
  res.send({ carrito: Cart });
});

carritoRouter.get("/:id/productos", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrito = new DaoCarrito();
  const cartByID = await carrito.getCartByID(id);
  if (cartByID[0] != undefined) {
    if (cartByID[0].productos.length > 0) {
      res.send({ carritoConProductos: cartByID[0].productos });
    } else res.status(404).send({ error: "Carrito sin productos" });
  } else res.status(404).send({ error: "Carrito no encontrado" });
});

carritoRouter.delete("/:cart_id/productos/:product_id", async (req, res) => {
  const cart_id = parseInt(req.params.cart_id);
  const product_id = parseInt(req.params.product_id);
  const carrito = new DaoCarrito();
  const deleted = await carrito.deleteProductToCart(cart_id, product_id);
  if (deleted == true) {
    res.status(200).send({ mensaje: "producto eliminado" });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

module.exports = { carritoRouter };
