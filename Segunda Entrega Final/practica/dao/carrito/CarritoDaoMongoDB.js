const moment = require("moment");
const ContenedorMongoDB = require("../../controllers/ContenedorMongoDB");
const Carrito = require("../../model/carrito");
const Producto = require("../../model/producto");
const mongoose = require("mongoose");
const DaoProductos = require("../producto/ProductoDaoMongoDB");

const carritoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  productos: { type: Array, required: false },
});

class CarritoDaoMongoDB {
  async getAllCarts() {
    const mongo = new ContenedorMongoDB();
    return await mongo.getAll(carritoSchema, "carrito");
  }

  async getCartByID(id) {
    const mongo = new ContenedorMongoDB();
    let listadoCarritos = await mongo.getByID(carritoSchema, "carrito", id);
    const cartByID = listadoCarritos.filter((cart) => {
      return cart.id == id;
    });
    return cartByID;
  }

  async addCart() {
    let index = 0;
    const mongo = new ContenedorMongoDB();
    let listadoCarritos = await mongo.getAll(carritoSchema, "carrito");
    const fechaActual = moment();
    let carrito = new Carrito(fechaActual);

    if (listadoCarritos.length == 0) {
      index = 1;
    } else {
      index = listadoCarritos[listadoCarritos.length - 1].id + 1;
    }

    carrito.id = index;
    await mongo.save(carritoSchema, "carrito", carrito);
    return carrito;
  }

  async deleteCart(id) {
    let result = false;
    const mongo = new ContenedorMongoDB();
    let res = await mongo.deleteById(carritoSchema, "carrito", id);
    if (res.deletedCount == 0) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  async addProductToCart(cart_id, product_id) {
    const mongo = new ContenedorMongoDB();
    const productos = new DaoProductos();
    const productByID = await productos.getProductByID(product_id);
    const producto = new Producto(
      productByID[0].timestamp,
      productByID[0].name,
      productByID[0].description,
      productByID[0].thumbnail,
      productByID[0].code,
      productByID[0].price,
      productByID[0].stock
    );
    producto.id = product_id;

    const res = await mongo.addProductToCart(
      carritoSchema,
      "carrito",
      cart_id,
      producto
    );
 
    if(res.modifiedCount == 1){
      return await mongo.getByID(carritoSchema, "carrito", cart_id)
    }
  }

  async deleteProductToCart(cart_id, product_id) {
    let result = false;
    const mongo = new ContenedorMongoDB();
    const res = await mongo.deleteProductFromCart(carritoSchema, "carrito", cart_id, product_id);    
    if(res.modifiedCount == 1) {
      result = true;
    }

    return result;
  }
}

module.exports = CarritoDaoMongoDB;
