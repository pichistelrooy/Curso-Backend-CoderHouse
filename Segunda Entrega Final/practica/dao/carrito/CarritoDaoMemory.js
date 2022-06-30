const moment = require("moment");
const ProductoDaoMemory = require("../producto/ProductoDaoMemory");
const ContenedorMemory = require("./../../controllers/ContenedorMemory");
const Carrito = require("./../../model/carrito");

class CarritoDaoMemory {
  
  async getAllCarts() {
    const memory = new ContenedorMemory();
    const listadoCarritos = await memory.getAllCarts();
    return listadoCarritos;
  }

  async getCartByID(id) {
    const memory = new ContenedorMemory();
    let listadoCarritos = await memory.getAllCarts();
    const cartByID = listadoCarritos.filter((cart) => {
      return cart.id == id;
    });
    return cartByID;
  }

  async addCart() {
    let index = 0;
    const fechaActual = moment();
    let cart = new Carrito(fechaActual.format("DD/MM/YYYY HH:MM:SS"));

    const memory = new ContenedorMemory();
    let listadoCarritos = await memory.getAllCarts();
    const count = listadoCarritos.length;

    if (listadoCarritos.length == 0) {
      index = 1;
    } else {
      index = listadoCarritos[listadoCarritos.length - 1].id + 1;
    }

    cart.id = index;

    memory.saveCart(cart, count);
    return cart.id;
  }

  async deleteCart(id) {
    let result = false;
    const memory = new ContenedorMemory();
    let listadoCarritos = await memory.getAllCarts();

    const listaAux = listadoCarritos.filter((cart) => {
      return cart.id != id;
    });

    if (listaAux.length != listadoCarritos.length) {
      result = true;
      memory.deleteCartById(id);
    }
    return result;
  }

  async addProductToCart(cart_id, product_id) {
    const memoryp = new ProductoDaoMemory();
    const producto = await memoryp.getProductByID(product_id);
    const memory = new ContenedorMemory();
    let listadoCarritos = await memory.getAllCarts();

    if (producto[0] != undefined) {
      listadoCarritos.forEach((cart) => {
        if (cart.id == cart_id) {
          cart.productos.push(producto[0]);
        }
      });
    }
    await memory.saveAllCart(listadoCarritos);
    return await this.getCartByID(cart_id);
  }

  async deleteProductToCart(cart_id, product_id) {
    let result = false;
    const memory = new ContenedorMemory();
    let listadoCarritos = await memory.getAllCarts();

    listadoCarritos.forEach((cart) => {
      if (cart.id == cart_id) {
        const listaAux = cart.productos.filter((producto) => {
          return producto.id != product_id;
        });

        if (listaAux.length != cart.productos.length) {
          cart.productos = listaAux;
          result = true;
        }
      }
    });

    if (result == true) {
      await memory.saveAllCart(listadoCarritos);
    }

    return result;
  }
}

module.exports = CarritoDaoMemory;
