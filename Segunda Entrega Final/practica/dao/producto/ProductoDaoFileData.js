const moment = require("moment");
const ContenedorFileData = require("../../controllers/ContenedorFileData");
const Producto = require("./../../model/producto");

class ProductoDaoFileData{

  async getAllProducts() {
    const filedata = new ContenedorFileData("./productos.txt");
    let listadoProductos = await filedata.getAll();
    return listadoProductos;
  }

  async getProductByID(id) {
    const filedata = new ContenedorFileData("./productos.txt");
    let listadoProductos = await filedata.getAll();
    const productByID = listadoProductos.filter((product) => {
      return product.id == id;
    });
    return productByID;
  }

  async addProduct(body) {
    let index = 0;
    const filedata = new ContenedorFileData("./productos.txt");
    let listadoProductos = await filedata.getAll();
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
    await filedata.save(producto, count);
    return producto;
  }

  async updateProduct(id, body) {
    const filedata = new ContenedorFileData("./productos.txt");
    let listadoProductos = await filedata.getAll();

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

    await filedata.saveAll(listadoProductos);
    
    const lista = listadoProductos.filter((producto) => {
      return producto.id == id;
    });
    
    return lista;
  }

  async deleteProduct(id) {
    let result = false;
    const filedata = new ContenedorFileData("./productos.txt");
    let listadoProductos = await filedata.getAll();

    const listaAux = listadoProductos.filter((producto) => {
      return producto.id != id;
    });

    if (listaAux.length != listadoProductos.length) {
      result = true;
      await filedata.deleteById(id);
    }

    return result;
  }
}

module.exports = ProductoDaoFileData;
