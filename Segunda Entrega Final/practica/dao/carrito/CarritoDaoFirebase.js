const moment = require("moment");
const ContenedorFirebase = require("../../controllers/ContenedorFirebase");
const Carrito = require("../../model/carrito");
const Producto = require("../../model/producto");
const DaoProductos = require("../producto/ProductoDaoFirebase");

class CarritoDaoFirebase {
  async getAllCarts() {
    const firebase = new ContenedorFirebase();
    return await firebase.getAll("carrito");
  }

  async getCartByID(id) {
    const firebase = new ContenedorFirebase();
    let listadoCarritos = await firebase.getByID("carrito", id);
    const cartByID = listadoCarritos.filter((cart) => {
      return cart.id == id;
    });
    return cartByID;
  }

  async addCart() {
    let index = 0;
    let firebase = new ContenedorFirebase();
    let listadoCarritos = await firebase.getAll("carrito");
    const fechaActual = moment();
    let carrito = new Carrito(fechaActual);    
    if (listadoCarritos.length == 0) {
      index = 1;
    } else {
      index = listadoCarritos[listadoCarritos.length - 1].id + 1;
    }
    carrito.id = index;

    firebase = new ContenedorFirebase();
    await firebase.saveCart("carrito", carrito);
    return carrito;
  }

  async deleteCart(id) {
    let result = false;
    const firebase = new ContenedorFirebase();
    let res = await firebase.deleteById("carrito", id);
    if (!res) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  /*async addProductToCart(cart_id, product_id) {    
    const productos = new DaoProductos();
    console.log('preproductbyid');
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
    console.log('addProductToCart');
    let firebase = new ContenedorFirebase();
    await firebase.addProductToCart(
     "carrito",
      cart_id,
      producto
    );
    console.log('getByID');  
    firebase = new ContenedorFirebase();    
    return await firebase.getByID("carrito", cart_id);
  }

  async deleteProductToCart(cart_id, product_id) {
    let result = false;
    const firebase = new ContenedorFirebase();
    const res = await firebase.deleteProductFromCart(
      carritoSchema,
      "carrito",
      cart_id,
      product_id
    );
    if (res.modifiedCount == 1) {
      result = true;
    }

    return result;
  }*/
}

module.exports = CarritoDaoFirebase;
