const moment = require("moment");
const ContenedorMongoDB = require("../../controllers/ContenedorMongoDB");
const Producto = require("../../model/producto");
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  name: { type: String, required: true, max: 40 },
  description: { type: String, required: true, max: 200 },
  thumbnail: { type: String, required: true, max: 2000 },
  price: { type: Number, required: true },
  code: { type: Number, required: true },
  stock: { type: Number, required: true },
});

class ProductoDaoMongoDB {
  async getAllProducts() {
    const mongo = new ContenedorMongoDB();
    let listadoProductos = await mongo.getAll(productoSchema, "producto");
    return listadoProductos;
  }

  async getProductByID(id) {
    const mongo = new ContenedorMongoDB();
    let listadoProductos = await mongo.getByID(productoSchema, "producto", id);
    const productByID = listadoProductos.filter((product) => {
      return product.id == id;
    });
    return productByID;
  }

  async addProduct(body) {
    let index = 0;
    const mongo = new ContenedorMongoDB();
    let listadoProductos = await mongo.getAll(productoSchema, "producto");
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
    await mongo.save(productoSchema, "producto", producto);
    return producto;
  }

  async updateProduct(id, product) {
    const mongo = new ContenedorMongoDB();
    return await mongo.UpdateProductById(
      productoSchema,
      "producto",
      id,
      product
    );
  }

  async deleteProduct(id) {
    let result = false;
    const mongo = new ContenedorMongoDB();
    let res = await mongo.deleteById(productoSchema, "producto", id);
    if (res.deletedCount == 0) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }
}

module.exports = ProductoDaoMongoDB;
