
const numeros = process.argv.slice(2).map((num) => Number(num));

if (numeros.length === 0) {
  console.error({
    error: {
      descripcion: 'No se recibieron numeros'
    }
  });
  process.exit(-5);
}

for (num of numeros) {
  if (isNaN(num)) {
    console.error({
      error: {
        descripcion: 'Uno de los inputs no es un numero',
        numeros: process.argv.slice(2),
        tipos: process.argv.slice(2).map((a) => typeof a)
      }
    });
    process.exit(-5);
  }
}

const datos = {
  promedio: numeros.reduce((total, num) => total + num) / numeros.length,
  max: Math.max(...numeros),
  min: Math.min(...numeros),
  pid: process.pid,
  ejecutable: process.title,
  numeros
}

process.on('exit', (codigo) => {
  console.log('Saliendo con codigo: ', codigo);
});

console.log(datos);