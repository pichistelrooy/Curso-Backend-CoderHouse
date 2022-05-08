const fs = require('fs');

const escribirEnArchivoPromesa = (nombre, contenido) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(nombre, contenido, (error) => {
      if (error) reject(error);
      else resolve();
    })
  });
}

escribirEnArchivoPromesa('resultado.txt', 'Este es el resultado')
  .then(() => {
    console.log('Finalizado!');
  });