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
     * @param {string} product
     * @returns an Product numeric ID
     */
    async save(product) {
        try {

            //check if file exists
            await fileExist(this.file);
            let index = 0;            
            let products = JsonToObject(await readfile(this.file));

            //check if an empty file
            if (products.length == 0) {
                index = 1;
            } else {
                //return ths last index and sum 1 to the new index object
                index = products[products.length - 1].id + 1;
            }

            product.id = index;
            //add product to products
            products.push(product);  
            //write file          
            await writeFile(this.file, ObjectToJson(products));

            return product.id;

        } catch (error) {
            throw error;
        }
    }

    /**
     * select an object with a specific id
     * @param {int} id 
     * @returns returns an object if it exists
     */
    async getById(id) {
        try {

            await fileExist(this.file);
            let products = JsonToObject(await readfile(this.file));
            products = products.filter((product) => {
                return product.id == id;
            });

            if (products.length == 0) {
                return null;
            } else {
                return products[0];
            }
        } catch (error) {
            throw error;
        }
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
     * Delete a product by ID
     * @param {int} id 
     * @returns none
     */
    async deleteById(id) {
        try {
            
            await fileExist(this.file);
            let products = JsonToObject(await readfile(this.file));
            products = products.filter((product) => {
                return product.id != id;
            });

            await writeFile(this.file, ObjectToJson(products));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete all products in the file(clear file)
     * @params none
     * @returns none
     */
    async deleteAll() {
        try {
            
            await newFile(this.file);

        } catch (error) {
            throw error;
        }
    }
}

class Producto {

    constructor(title, price, thumbnail) {    
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;       
        this.id = 0;
    }
    
}

async function ejecutar() {

    const productos = new Contenedor('./PiccoliniMarcos.txt');

    // Save
    let producto = new Producto('Arroz', 19.99, 'https://http2.mlstatic.com/D_NQ_NP_624074-MLA43272343541_082020-O.webp');    
    console.log('Producto agregado con Id: ' + await productos.save(producto));
    producto = new Producto('Atun', 19.99, 'https://jumboargentina.vteximg.com.br/arquivos/ids/624282-1000-1000/At-n-Al-Natural-La-Campagnola-120-Gr-1-3627.jpg?v=637508132151430000');    
    console.log('Producto agregado con Id: ' + await productos.save(producto));
    producto = new Producto('Slsa de tomate', 19.99, 'https://http2.mlstatic.com/D_NQ_NP_802492-MLA46925625579_072021-O.webp');    
    console.log('Producto agregado con Id: ' + await productos.save(producto));
    console.log('');

    // GetByID
    let id = 2;
    console.log('Obteniendo Producto con ID ' + id + ': ' + ObjectToJson(await productos.getById(id)))
    id = 20;
    console.log('Obteniendo Producto con ID ' + id + ': ' + await productos.getById(id));
    console.log('');

    // GetAll
    console.log('Obteniendo todos los Productos: ' + ObjectToJson(await productos.getAll()));
    console.log('');

    // DeleteByID
    id = 2;
    console.log('Borrando con ID ' + id + ': ' + id);
    await productos.deleteById(id);
    console.log('Productos: ' + ObjectToJson(await productos.getAll()));

    // DeleteAll
    await productos.deleteAll();
    console.log('Productos: ' + ObjectToJson(await productos.getAll()));
}    

ejecutar()