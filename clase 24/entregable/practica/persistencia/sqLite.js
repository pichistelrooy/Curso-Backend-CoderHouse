const Knex = require("knex").default;
var knex = null;

class sqLite {
  constructor(client, options) {
    knex = Knex({
      client: client,
      connection: options,
      useNullAsDefault: true
    });
  }

  crearBD = async () => {
    const date = new Date();
    //console.log('drop table messages');
    await knex.schema.dropTableIfExists("messages");
    //console.log('table dropped');
    //console.log('create table messages');
    await knex.schema.createTable("messages", (table) => {
      table.increments("id").primary().notNullable();
      table.string("email", 40).notNullable();
      table.string("message", 200).notNullable();
      table.date("date").notNullable();
    });
    //console.log('table messages created');
    //console.log('insert data in table messages');
    await knex("messages").insert([
      {
        email: "picho_xeneize@hotmail.com",
        message: "Hola, como estas?",
        date: String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString()),
      },
      {
        email: "sergio@hotmail.com",
        message: "bien, vos?",
        date: String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString()),
      },
    ]);
    //console.log('data inserted');
    //console.log('obtain data messages');
    //console.log(await knex.from("messages").select("*"));
    //console.log('data messages obtained');
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

module.exports = sqLite;