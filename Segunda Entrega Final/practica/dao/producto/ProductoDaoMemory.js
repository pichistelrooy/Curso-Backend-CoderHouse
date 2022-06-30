const moment = require("moment");
const ContenedorMemory = require("../../controllers/ContenedorMemory");
const Producto = require("../../model/producto");

class ProductoDaoMemory{

  async getAllProducts() {
    const memory = new ContenedorMemory();
    let listadoProductos = await memory.getAllProducts();
    return listadoProductos;
  }

  async getProductByID(id) {
    const memory = new ContenedorMemory();
    let listadoProductos = await memory.getAllProducts();
    const productByID = listadoProductos.filter((product) => {
      return product.id == id;
    });
    return productByID;
  }

  async addProduct(body) {
    let index = 0;
    const memory = new ContenedorMemory();    
    let listadoProductos = await memory.getAllProducts();
    const count = listadoProductos.length;
    const fechaActual = moment();
    let producto = new Producto(
      fechaActual.format("DD/MM/YYYY HH:MM:SS"),
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
    await memory.saveProduct(producto, count);
    listadoProductos = await memory.getAllProducts();
    return producto;
  }

  async updateProduct(id, body) {
    const memory = new ContenedorMemory();
    let listadoProductos = await memory.getAllProducts();

    listadoProductos.forEach((product) => {
      if (product.id == id) {
        const fechaActual = moment();
        product.timestamp = fechaActual.format("HH:MM:SS");
        product.name = body.name;
        product.description = body.description;
        product.thumbnail = body.thumbnail;
        product.code = body.code;
        product.price = body.price;
        product.stock = body.stock;
      }
    });

    await memory.saveAllproduct(listadoProductos);
    
    const lista = listadoProductos.filter((producto) => {
      return producto.id == id;
    });
    
    return lista;
  }

  async deleteProduct(id) {
    let result = false;
    const memory = new ContenedorMemory();
    let listadoProductos = await memory.getAllProducts();

    const listaAux = listadoProductos.filter((producto) => {
      return producto.id != id;
    });

    if (listaAux.length != listadoProductos.length) {
      result = true;
      await memory.deleteProductById(id);
    }

    return result;
  }
}

module.exports = ProductoDaoMemory;
