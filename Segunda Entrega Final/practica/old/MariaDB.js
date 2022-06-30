const Knex = require('knex').default;
var knex = null;

class MariaDB {

  constructor(options) {
    knex = Knex(options);    
  }

  inicializarBD = async () => {
    //console.log('drop table products');
    await knex.schema.dropTableIfExists("products");
    //console.log('table dropped');
    //console.log('create table products');
    await knex.schema.createTable("products", (table) => {
      table.increments("id").primary().notNullable();
      table.string("title", 40).notNullable();
      table.decimal("price",6,2).notNullable();
      table.string("thumbnail").notNullable();
    });    
    //console.log('table products created');
    //console.log('insert data in table products');
    await knex("products").insert([
      {title: "Coffee", price: 15.39, thumbnail: 'https://cdn2.iconfinder.com/data/icons/coffee-19/450/Coffee_bag-512.png'},
      {title: "Tomato", price: 25.31, thumbnail: 'https://cdn3.iconfinder.com/data/icons/veggies/512/tomato.png'}      
    ]);
    //console.log('data inserted');
  }

  /**
   * @param {object} product
   * @returns none
   */
   async insertProduct(product) {
    try {
      await knex("products").insert([
        { title: product.title, price: product.price, thumbnail: product.thumbnail},
      ]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all products
   * @params none
   * @returns none
   */
   async SelectProducts() {
    try {
      return await knex.from("products").select("*");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MariaDB;
