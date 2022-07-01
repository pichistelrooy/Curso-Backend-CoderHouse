const admin = require("firebase-admin");
const serviceAccount = require("./../db/firebase/basefirebase-45ca3-firebase-adminsdk-j3iu8-3f2fed3b8c.json");
let db = null;

class ContenedorFirebase {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://basefirebase-45ca3.firebaseio.com",
    });
    this.db = admin.firestore();
    console.log("Base de datos conectada");
  }

  async disconect() {
    await admin.app().delete();
  }

  /**
   * @param {string} data
   * @returns none
   */
  async saveCart(collection, data) {
    try {
      const query = this.db.collection(collection);
      const carrito = query.doc(`${data.id}`);
      await carrito.create({
        id: data.id,
        timestamp: data.timestamp,
        productos: data.productos,
      });
      await this.disconect();
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} data
   * @returns none
   */
  async saveProduct(collection, data) {
    try {
      const query = this.db.collection(collection);
      const producto = query.doc(`${data.id}`);
      await producto.create({
        id: data.id,
        timestamp: data.timestamp,
        name: data.name,
        description: data.description,
        thumbnail: data.thumbnail,
        price: data.price,
        code: data.code,
        stock: data.stock,
      });
      await this.disconect();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all data in the file
   * @params none
   * @returns a object of file data
   */
  async getAll(collection) {
    try {
      console.log("USSANDO FIREBASE");
      const query = this.db.collection(collection);
      const resultado = (await query.get()).docs;
      await this.disconect();
      return resultado.map((data) => data.data());
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all data in the file
   * @params none
   * @returns a object of file data
   */
  async getByID(collection, id) {
    try {
      const query = this.db.collection(collection);
      const resultado = (await query.get({ id: id })).docs;
      await this.disconect();
      return resultado.map((data) => data.data());
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete by ID
   * @param {int} id
   * @returns none
   */
  async deleteById(collection, idcol) {
    try {
      const query = this.db.collection(collection);
      const doc1 = query.doc(idcol.toString());
      let result = false;
      const res = await doc1.delete();
      console.log(res);
      result = true;
      await this.disconect();
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a product by ID
   * @param {int} id
   * @returns none
   */
  async UpdateProductById(collection, idcol, data) {
    try {
      const query = this.db.collection(collection);
      const doc1 = query.doc(idcol.toString());
      let result = false;
      await doc1.update({
        name: data.name,
        description: data.description,
        code: data.code,
        price: data.price,
        stock: data.stock,
        thumbnail: data.thumbnail,
        timestamp: data.timestamp,
      });
      result = true;
      await this.disconect();
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a cart by ID, adding a product
   * @param {int} id
   * @returns none
   */
  /*async addProductToCart(collection, idcart, product) {
    try {
      //const query = this.db.collection(collection);
      //const doc1 = query.doc(idcart.toString());
      let result = false;      
      let productos = this.db.collection(collection).doc('productos');
      console.log(productos);
      // Atomically add a new region to the "regions" array field.
      let arrUnion = productos.update({
        productos: admin.firestore.FieldValue.arrayUnion(product)
      });

      console.log(arrUnion);
      await doc1.update({
        productos: product.name
      });
      result = true;
      await this.disconect();
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * delete a product from cartº
   * @param {int} id
   * @returns none
   */
  /*async deleteProductFromCart(schema, collection, idcart, idproduct) {
    try {
      const Cart = mongoose.model(collection, schema);

      return await Cart.updateOne(
        {
          id: idcart,
        },
        {
          $pull: { productos: { id: idproduct } },
        }
      );
    } catch (error) {
      throw error;
    }
  }*/
}

module.exports = ContenedorFirebase;
