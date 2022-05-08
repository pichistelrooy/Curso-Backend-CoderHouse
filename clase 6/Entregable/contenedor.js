const fs = require("fs");

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param {json} json
 * @returns object
 */
const JsonToObject = (json) => {
  try {
    if (json.length > 0) {
      return JSON.parse(json);
    } else {
      return JSON.parse("[]");
    }
  } catch (error) {
    console.log("Se produjo un error convirtiendo el Json a Objecto");
    throw error;
  }
};

/**
 * Read a file
 * @param {string} fileName
 * @returns a content of a file
 */
const readfile = async (fileName) => {
  try {
    return await fs.promises.readFile(fileName, "utf-8");
  } catch (error) {
    console.log("Se produjo un error leyendo el archivo solicitado");
    throw error;
  }
};

/**
 * creates a empty new file
 * @param {string} fileName
 */
const newFile = async (fileName) => {
  try {
    await fs.promises.writeFile(fileName, "");
  } catch (e) {
    throw error;
  }
};

/**
 * Check that the file exists. Call a new file if not.
 * @param {string} fileName
 */
const fileExist = async (fileName) => {
  if (fs.existsSync(fileName) == false) {
    await newFile(fileName);
  }
};

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  /**
   * Return all prodcts in the file
   * @params none
   * @returns a object of file data
   */
  async getAll() {
    try {
      await fileExist(this.file);
      return JsonToObject(await readfile(this.file));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return random product in the file
   * @params none
   * @returns a object of file data
   */
  async getRandom() {
    try {
      await fileExist(this.file);
      let products = [];
      products = JsonToObject(await readfile(this.file));
      const product = products[Math.floor(Math.random() * products.length)];
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor;

class Producto {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = 0;
  }
}
