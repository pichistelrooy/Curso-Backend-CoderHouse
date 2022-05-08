const fs = require('fs');

class Contenedor {

  id = 1;

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(objeto) {
    objeto['id'] = this.id;
    this.id++;
    const contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
    contenido.push(objeto);
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
  }

  saveThen(objeto) {
    objeto['id'] = this.id;
    this.id++;
    return fs
      .promises
      .readFile(this.nombreArchivo)
      .then((contenido) => {
        const contenidoParseado = JSON.parse(contenido);
        contenidoParseado.push(objeto);
        return contenidoParseado;
      })
      .then((nuevoContenido) => {
        return fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoContenido));
      });
  }

  async getAll() {
    try {
      const contenidoCrudo = await fs.promises.readFile(this.nombreArchivo);
      const contenido = JSON.parse(contenidoCrudo);
      return contenido;
    } catch (error) {
      console.log('Error en getAll: ', error);
      return [];
    }
  }
}

const ejecutarProductos = async () => {
  const productos = new Contenedor('productos.txt');
  await productos.save({title: 'Cif Antigrasa', price: 28.86, thumbnail: 'random_string'});
  console.log(await productos.getAll());
}

ejecutarProductos();