const moment = require("moment");
const ProductoDaoFileData = require("../producto/ProductoDaoFileData");
const ContenedorFileData = require("./../../controllers/ContenedorFileData");
const Carrito = require("./../../model/carrito");

class CarritoDaoFileData {
  async getAllCarts() {
    const filedata = new ContenedorFileData("./carritos.txt");
    const listadoCarritos = await filedata.getAll();
    return listadoCarritos;
  }

  async getCartByID(id) {
    const filedata = new ContenedorFileData("./carritos.txt");
    let listadoCarritos = await filedata.getAll();
    const cartByID = listadoCarritos.filter((cart) => {
      return cart.id == id;
    });
    return cartByID;
  }

  async addCart() {
    let index = 0;
    const fechaActual = moment();
    let cart = new Carrito(fechaActual.format("DD/MM/YYYY HH:MM:SS"));

    const filedata = new ContenedorFileData("./carritos.txt");
    let listadoCarritos = await filedata.getAll();
    const count = listadoCarritos.length;

    if (listadoCarritos.length == 0) {
      index = 1;
    } else {
      index = listadoCarritos[listadoCarritos.length - 1].id + 1;
    }

    cart.id = index;

    filedata.save(cart, count);
    return cart.id;
  }

  async deleteCart(id) {
    let result = false;
    const filedata = new ContenedorFileData("./carritos.txt");
    let listadoCarritos = await filedata.getAll();

    const listaAux = listadoCarritos.filter((cart) => {
      return cart.id != id;
    });

    if (listaAux.length != listadoCarritos.length) {
      result = true;
      filedata.deleteById(id);
    }
    return result;
  }

  async addProductToCart(cart_id, product_id) {
    const filedatap = new ProductoDaoFileData();
    const producto = await filedatap.getProductByID(product_id);
    const filedata = new ContenedorFileData("./carritos.txt");
    let listadoCarritos = await filedata.getAll();

    if (producto[0] != undefined) {
      listadoCarritos.forEach((cart) => {
        if (cart.id == cart_id) {
          cart.productos.push(producto[0]);
        }
      });
    }
    await filedata.saveAll(listadoCarritos);
    return await this.getCartByID(cart_id);
  }

  async deleteProductToCart(cart_id, product_id) {
    let result = false;
    const filedata = new ContenedorFileData("./carritos.txt");
    let listadoCarritos = await filedata.getAll();

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
      await filedata.saveAll(listadoCarritos);
    }

    return result;
  }
}

module.exports = CarritoDaoFileData;
