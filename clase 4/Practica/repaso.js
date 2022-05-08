const fs = require('fs');

const intervalId = setInterval(() => {
  console.log('Un mensaje intervalado');
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 5000);

fs.writeFile('output.txt', 'ESTE ES EL OUTPUT', () => {
  console.log('Escritura finalizada');
});

const escrituraConPromesa = (nombreArchivo, contenido) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(nombreArchivo, contenido, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

console.log('Inicio del programa');

escrituraConPromesa('salida.txt', 'mensajito')
  .then(() => {
    console.log('Escritura finalizada');
  })
  .catch((error) => {
    console.log('Escritura con error');
  })

console.log('Fin del programa');

const imprimirEnPantalla = (mensaje, callback) => {
  if (!mensaje) callback(25);
  else {
    console.log(mensaje);
    callback();
  }
};

imprimirEnPantalla('', (errorcito) => {
  console.log('Este es el error: ', errorcito);
});
