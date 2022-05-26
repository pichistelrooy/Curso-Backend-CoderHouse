let listadoProductos = [];

class Contenedor {
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
    let producto = new Producto(body.title, body.price, body.thumbnail);

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

    return producto;
  }

  update(id, body) {
    listadoProductos.forEach((product) => {
      if (product.id == id) {
        product.title = body.title;
        product.price = body.price;
        product.thumbnail = body.thumbnail;
      }
    });

    return listadoProductos.filter((producto) => {
      return producto.id == id;
    });
  }

  delete(id) {
    return listadoProductos.splice(id - 1, 1);
  }
}

class Producto {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = 0;
  }
}

module.exports = Contenedor;
