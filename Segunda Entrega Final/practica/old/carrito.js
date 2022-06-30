const moment = require("moment");
const Productos = require("./productos.js");
const FileData = require("./filedata.js");

let listadoCarritos = [];

class Carritos {  

  addCart() {
    let index = 0;
    const count = listadoCarritos.length;
    const fechaActual = moment();
    let cart = new Carrito(fechaActual.format("DD/MM/YYYY HH:MM:SS"));
    const filedata = new FileData('./carritos.txt');
    
    //check if an empty array
    if (listadoCarritos.length == 0) {
      index = 1;
    } else {
      //return ths last index and sum 1 to the new index object
      index = listadoCarritos[listadoCarritos.length - 1].id + 1;
    }

    cart.id = index;
    //add product to products
    listadoCarritos.push(cart);

    filedata.save(cart, count);
    return cart.id;
  }  

  deleteCart(id) {
    let result = false;
    const filedata = new FileData('./carritos.txt');
    const listaAux = listadoCarritos.filter((cart) => {
      return cart.id != id;
    });

    if (listaAux.length != listadoCarritos.length) {
      listadoCarritos = listaAux;
      result = true;
      filedata.deleteById(cart.id);
    }

    return result;
  }

  getAll() {   
    return listadoCarritos;    
  }

  getByID(id) {
    const cartByID = listadoCarritos.filter((cart) => {
      return cart.id == id;
    });
    return cartByID;
  }

  addProduct(cart_id, product_id) {
    const productos = new Productos();
    const producto = productos.getByID(product_id);
    const filedata = new FileData('./carritos.txt');    

    if (producto[0] != undefined) {
      listadoCarritos.forEach((cart) => {
        if (cart.id == cart_id) {
          cart.productos.push(producto[0]);
        }
      });
    }
    filedata.saveAll(listadoCarritos);
    return this.getByID(cart_id);
  }

  deleteProduct(cart_id, product_id) {
    let result = false;
    const filedata = new FileData('./carritos.txt');
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

    if(result == true){
      filedata.saveAll(listadoCarritos);
    }

    return result;
  }
}

class Carrito {
  constructor(timestamp) {
    this.timestamp = timestamp;
    this.id = 0;
    this.productos = [];
  }
}

module.exports = Carritos;
