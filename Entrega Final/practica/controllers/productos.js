const moment = require('moment'); 
const FileData = require("./filedata.js");
let listadoProductos = [];

class Productos {

  getAll() {
    return listadoProductos;
  }

  getByID(id) {
    const productByID = listadoProductos.filter((product) => {
      return product.id == id;
    });
    return productByID;
  }

  add(body) {
    let index = 0;
    const count = listadoProductos.length;
    const fechaActual = moment();    
    let producto = new Producto(fechaActual.format("DD/MM/YYYY HH:MM:SS"), body.name, body.description, body.thumbnail, body.code, body.price, body.stock);
    const filedata = new FileData('./productos.txt');

    //check if an empty array
    if (listadoProductos.length == 0) {
      index = 1;
    } else {
      //return ths last index and sum 1 to the new index object
      index = listadoProductos[listadoProductos.length - 1].id + 1;
    }

    producto.id = index;
    //add product to products
    listadoProductos.push(producto);

    filedata.save(producto, count);
    return producto;
  }

  update(id, body) {
    const filedata = new FileData('./productos.txt');
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

    const lista = listadoProductos.filter((producto) => {
      return producto.id == id;
    });
    filedata.saveAll(lista);
    return lista;
  }

  delete(id) {
    let result = false;
    const filedata = new FileData('./productos.txt');
    const listaAux = listadoProductos.filter((producto) => {
      return producto.id != id;
    });

    if (listaAux.length != listadoProductos.length) {
      listadoProductos = listaAux;
      result = true;
      filedata.deleteById(id);
    }

    return result;
  }
}

class Producto {
  constructor(timestamp, name, description, thumbnail, code, price, stock) {
    this.timestamp = timestamp;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.id = 0;
  }
}

module.exports = Productos;