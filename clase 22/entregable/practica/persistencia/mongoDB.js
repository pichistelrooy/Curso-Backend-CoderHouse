const mongoose = require("mongoose");
const Message = require("./../model/message");
const Author = require("./../model/author");
const moment = require("moment");

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true, max: 200 },
  author: {
    email: { type: String, required: true, max: 40 },
    nombre: { type: String, required: true, max: 40 },
    apellido: { type: String, required: true, max: 40 },
    edad: { type: Number, required: true },
    alias: { type: String, required: true, max: 25 },
    avatar: { type: String, required: true }
  }  
});

class mongoDB {
  constructor() {
    mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("conectado a DB Mongo");
  }

  inicializarBD = async () => {
    const fechaActual = moment();
    let author = new Author(
      "marcos@gmail.com",
      "Marcos",
      "piccolini",
      31,
      "Pichistelrooy",
      "asdadasd"
    );
    let message = new Message(fechaActual, "hola como estas?", author);

    const Collection = mongoose.model("message", messageSchema);
    console.log("borrando datos");
    //console.log(await Collection.deleteMany({ email: "marcos@gmail.com" }));
    //console.log(await Collection.deleteMany({ email: "pepe@gmail.com" }));
    await Collection.deleteMany({ email: "marcos@gmail.com" });
    await Collection.deleteMany({ email: "pepe@gmail.com" });

    let colsave = new Collection(message);
    //console.log(await colsave.save());
    await colsave.save();

    author = new Author(
      "pepe@gmail.com",
      "Pepe",
      "Riquelme",
      25,
      "Pepito90",
      "45645645asdasdad"
    );
    message = new Message(fechaActual, "bien, vos??", author);

    colsave = new Collection(message);
    //console.log(await colsave.save());
    await colsave.save();

    author = new Author(
      "marcos@gmail.com",
      "Marcos",
      "piccolini",
      31,
      "Pichistelrooy",
      "8989"
    );
    message = new Message(fechaActual, "mal, tengo un problema", author);  

    colsave = new Collection(message);
    //console.log(await colsave.save());
    await colsave.save();
  };

  /**
   * @param {object} message
   * @returns none
   */
  async insertMessage(message) {
    try {
      /*await knex("messages").insert([
        { email: message.email, message: message.message, date: message.date },
      ]);*/
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
      const Collection = mongoose.model("message", messageSchema);
      return Collection.find();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = mongoDB;
