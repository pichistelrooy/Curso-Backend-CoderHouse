const fs = require('fs');

// recuerden correr npm init -y en el directorio donde esten ejecutando el archivo
fs.stat('package.json', (error, stats) => {
  const tamano = stats.size;
  fs.readFile('package.json', 'utf-8', (error, contenido) => {
    const info = {
      contenidoStr: contenido,
      contenidoObj: JSON.parse(contenido),
      size: tamano
    };
    fs.writeFile('info.txt', JSON.stringify(info), (error) => {
      console.log('Operacion terminada');
    });
  });
});


const leerConPromesas = async () => {
  const contenido = await fs.promises.stat('package.json');
  console.log(contenido);
};


