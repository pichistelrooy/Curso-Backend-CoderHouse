const mongoose = require("mongoose");

class ContenedorMongoDB {
  constructor() {
    mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("conectado a DB Mongo");
  }

  /**
   * @param {string} data
   * @returns none
   */
  async save(schema, collection, data) {
    try {
      const Collection = mongoose.model(collection, schema);
      const colsave = new Collection(data);
      return await colsave.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all data in the file
   * @params none
   * @returns a object of file data
   */
  async getAll(schema, collection) {
    try {
      console.log("USSANDO MONGODB");
      const Collection = mongoose.model(collection, schema);
      return await Collection.find();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all data in the file
   * @params none
   * @returns a object of file data
   */
  async getByID(schema, collection, idcol) {
    try {
      const Collection = mongoose.model(collection, schema);
      return await Collection.find({ id: idcol });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete by ID
   * @param {int} id
   * @returns none
   */
  async deleteById(schema, collection, idcol) {
    try {
      const Collection = mongoose.model(collection, schema);
      return await Collection.deleteOne({ id: idcol });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a product by ID
   * @param {int} id
   * @returns none
   */
  async UpdateProductById(schema, collection, idcol, data) {
    try {
      const Collection = mongoose.model(collection, schema);
      return await Collection.updateOne(
        { id: idcol },
        {
          $set: {
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            price: data.price,
            code: data.code,
            stock: data.stock,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a cart by ID, adding a product
   * @param {int} id
   * @returns none
   */
  async addProductToCart(schema, collection, idcart, product) {
    try {
      const Cart = mongoose.model(collection, schema);
      let carrito = await Cart.find({ id: idcart });
      carrito[0].productos.push(product);

      return await Cart.updateOne(
        { id: idcart },
        {
          $set: {
            productos: carrito[0].productos,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * delete a product from cartº
   * @param {int} id
   * @returns none
   */
  async deleteProductFromCart(schema, collection, idcart, idproduct) {
    try {
      const Cart = mongoose.model(collection, schema);
      
      return await Cart.updateOne(
        { 
          id: idcart
        },
        {
          $pull: { productos: {id: idproduct} }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContenedorMongoDB;
