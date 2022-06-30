const Knex = require("knex").default;
var knex = null;

class ContenedorSqLite {
  constructor(client, options) {
    knex = Knex({
      client: client,
      connection: options,
      useNullAsDefault: true
    });
  }

  crearBD = async () => {
    const date = new Date();
    console.log('drop table product');
    await knex.schema.dropTableIfExists("product");
    console.log('table dropped');
    console.log('create table product');            

    await knex.schema.createTable("product", (table) => {
      table.increments("id").primary().notNullable();
      table.string("name", 40).notNullable();
      table.string("description", 200).notNullable();
      table.string("thumbnail", 2000).notNullable();
      table.date("timestamp").notNullable();
      table.number("code").notNullable();
      table.number("stock").notNullable();
      table.decimal("price",6,2).notNullable();
    });
    console.log('table product created');
    console.log('insert data in table product');
    await knex("product").insert([
      {name: "Coffee", description: 'a lot of coffe', thumbnail: 'https://cdn2.iconfinder.com/data/icons/coffee-19/450/Coffee_bag-512.png', 
      timestamp: date, code: 5000, stock: 150, price: 15.39}
    ]);
    console.log('data inserted');
    console.log('obtain data product');
    console.log(await knex.from("product").select("*"));
    console.log('data product obtained');

    console.log('***************************************************************');
    console.log('drop table carrito');
    await knex.schema.dropTableIfExists("carrito");
    console.log('table dropped');
    console.log('create table carrito');            

    await knex.schema.createTable("carrito", (table) => {
      table.increments("id").primary().notNullable();
      table.date("timestamp").notNullable();
    });
    console.log('table carrito created');
    console.log('insert data in table carrito');
    await knex("carrito").insert([
      {timestamp: date}
    ]);
    console.log('data inserted');
    console.log('obtain data carrito');
    console.log(await knex.from("carrito").select("*"));
    console.log('data carrito obtained');

    console.log('***************************************************************');
    console.log('drop table productscart');
    await knex.schema.dropTableIfExists("productscart");
    console.log('table dropped');
    console.log('create table productscart');            

    await knex.schema.createTable("productscart", (table) => {
      table.number("idproduct").primary().notNullable();
      table.number("idcart").primary().notNullable();
    });
    console.log('table productscart created');
    console.log('insert data in table productscart');
    await knex("productscart").insert([
      {idproduct: 1, idcart: 1}
    ]);
    console.log('data inserted');
    console.log('obtain data productscart');
    console.log(await knex.from("productscart").select("*"));
    console.log('data productscart obtained');
  };

  /**
   * @param {object} message
   * @returns none
   */
  async insertMessage(message) {
    try {
      await knex("messages").insert([
        { email: message.email, message: message.message, date: message.date},
      ]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all messages
   * @params none
   * @returns none
   */
  async SelectMessages() {
    try {
      return await knex.from("messages").select("*");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContenedorSqLite;