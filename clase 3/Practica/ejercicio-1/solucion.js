const resolverEnSegundos = (segundos) => {
  return new Promise((resolve) => {
    setTimeout(resolve, segundos*1000);
  });
};

const imprimirConPromesa = (texto) => {
  return new Promise((resolve, reject) => {
    if (!texto) reject('El texto está vacío')
    else {
      console.log(texto);
      resolve();
    }
  })
}

resolverEnSegundos(5)
  .then(() => {
    return imprimirConPromesa('Un Texto')
  })
  .then(() => console.log('Proceso finalizado'));