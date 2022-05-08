const fs = require('fs');

const escribirArchivo = () => {
  try {
    fs.writeFileSync('fyh.txt', (new Date()).toISOString());
  } catch (error) {
    throw new Error('Hubo un error en la escritura');
  }
}

const leerArchivo = () => {
  try {
    const contenido = fs.readFileSync('fyh.txt', 'utf-8');
    console.log(contenido);
  } catch (error) {
    throw new Error('Hubo un error al obtener');
  };
};

try {
  escribirArchivo();
  leerArchivo();
} catch (error) {
  console.log(error);
}