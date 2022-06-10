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
            return JSON.parse('[]');
        }
    } catch (error) {
        console.log("Se produjo un error convirtiendo el Json a Objecto");
        throw error;
    }
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * @param {object} object
 * @returns json
 */
const ObjectToJson = (object) => {
    try {        
        return JSON.stringify(object);
    } catch (error) {
        console.log("Se produjo un error convirtiendo el Objecto a Json");
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
        return await fs.promises.readFile(fileName, 'utf-8');        
    } catch (error) {
        console.log("Se produjo un error leyendo el archivo solicitado");
        throw error;
    }
};

/**
 * write a json data in a file
 * @param {string} fileName
 * @param {json} json
 */
const writeFile = async (fileName, json) => {
    try {
        await fs.promises.writeFile(fileName, json);
    } catch (error) {
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
const fileExist = async (fileName, count) => {
    if (fs.existsSync(fileName) == false || count == 0) {
        await newFile(fileName);
    }
};

class FileData {

    constructor(file) {
        this.file = file;
    }

    /**
     * @param {string} data
     * @returns none
     */
    async save(data, count) {
        try {

            //check if file exists
            await fileExist(this.file, count);
            let datafile = JsonToObject(await readfile(this.file));

            datafile.push(data);  
            //write file          
            await writeFile(this.file, ObjectToJson(datafile));

        } catch (error) {
            throw error;
        }
    }

    /**
     * Return all data in the file
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
     * Delete a product by ID
     * @param {int} id 
     * @returns none
     */
    async deleteById(id) {
        try {
            
            await fileExist(this.file);
            let datafile = JsonToObject(await readfile(this.file));
            datafile = datafile.filter((data) => {
                return data.id != id;
            });

            await writeFile(this.file, ObjectToJson(datafile));
        } catch (error) {
            throw error;
        }
    }

     /**
     * @param {string} data
     * @returns none
     */
      async saveAll(data) {
        try {

            //check if file exists
            await fileExist(this.file);
            //write file          
            await writeFile(this.file, ObjectToJson(data));

        } catch (error) {
            throw error;
        }
    }
}

module.exports = FileData;