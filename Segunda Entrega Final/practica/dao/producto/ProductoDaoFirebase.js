const moment = require("moment");
const ContenedorFirebase = require("../../controllers/ContenedorFirebase");
const Producto = require("../../model/producto");

class ProductoDaoFirebase {
  async getAllProducts() {
    const firebase = new ContenedorFirebase();
    let listadoProductos = await firebase.getAll("producto");
    return listadoProductos;
  }

  async getProductByID(id) {
    const firebase = new ContenedorFirebase();
    let listadoProductos = await firebase.getByID("producto", id);
    const productByID = listadoProductos.filter((product) => {
      return product.id == id;
    });
    return productByID;
  }

  async addProduct(body) {
    let index = 0;
    let firebase = new ContenedorFirebase();
    let listadoProductos = await firebase.getAll("producto");
    const fechaActual = moment();
    let producto = new Producto(
      fechaActual,
      body.name,
      body.description,
      body.thumbnail,
      body.code,
      body.price,
      body.stock
    );

    if (listadoProductos.length == 0) {
      index = 1;
    } else {
      index = listadoProductos[listadoProductos.length - 1].id + 1;
    }

    producto.id = index;
    firebase = new ContenedorFirebase();
    await firebase.saveProduct("producto", producto);
    return producto;
  }

  async updateProduct(id, product) {
    const fechaActual = moment();
    const firebase = new ContenedorFirebase();
    product.timestamp = fechaActual;
    return await firebase.UpdateProductById(
      "producto",
      id,
      product
    );
  }

  async deleteProduct(id) {
    let result = false;
    const firebase = new ContenedorFirebase();
    let res = await firebase.deleteById("producto", id);
    if (res.deletedCount == 0) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }
}

module.exports = ProductoDaoFirebase;
