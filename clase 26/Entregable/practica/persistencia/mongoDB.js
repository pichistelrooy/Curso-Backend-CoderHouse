import mongoose from "mongoose";
import Message from "./../model/message.js";
import Author from "./../model/author.js";
import User from "./../model/user.js";
import moment from "moment";
import bcrypt from "bcrypt";

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true, max: 200 },
  author: {
    email: { type: String, required: true, max: 40 },
    nombre: { type: String, required: true, max: 40 },
    apellido: { type: String, required: true, max: 40 },
    edad: { type: Number, required: true },
    alias: { type: String, required: true, max: 25 },
    avatar: { type: String, required: true },
  },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 40 },
  password: { type: String, required: true, max: 200 },
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
    console.log("borrando base mongo e inicializando data");
    await Collection.deleteMany({ email: "marcos@gmail.com" });
    await Collection.deleteMany({ email: "pepe@gmail.com" });

    let colsave = new Collection(message);
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
    await colsave.save();
    const passwordBcrypt = bcrypt.hashSync("123456", bcrypt.genSaltSync(10));
    let user = new User("picho_xeneize@hotmail.com", passwordBcrypt);

    const CollectionUser = mongoose.model("user", userSchema);
    await CollectionUser.deleteMany({ email: "picho_xeneize@hotmail.com" });
    let colsaveuser = new CollectionUser(user);
    await colsaveuser.save();
  };

  /**
   * @param {object} message
   * @returns none
   */
  async insertMessage(data) {
    try {
      const fechaActual = moment();
      const Collection = mongoose.model("message", messageSchema);
      const author = new Author(
        data.email,
        data.nombre,
        data.apellido,
        data.edad,
        data.alias,
        data.avatar
      );
      const message = new Message(fechaActual, data.text, author);
      const colsave = new Collection(message);
      await colsave.save();
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
      return Collection.find().lean();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return a user
   * @params email & password
   * @returns user
   */
  async login(user) {
    try {
      const Collection = mongoose.model("user", userSchema);
      return Collection.find({ email: user.email }).lean();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return a user if exist
   * @params email
   * @returns user
   */
  async find(email) {
    try {
      const Collection = mongoose.model("user", userSchema);
      return Collection.find({ email: email }).lean();
    } catch (error) {
      throw error;
    }
  }

  /**
   * register a user
   * @params email & password
   * @returns OK
   */
  async register(user) {
    try {
      const Collection = mongoose.model("user", userSchema);
      const colsave = new Collection(user);
      await colsave.save();
    } catch (error) {
      throw error;
    }
  }
}

export default mongoDB;
