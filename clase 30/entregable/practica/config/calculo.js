const calculoPesado = (cantidad) => {
  const randomNumbers = [];
  for (let i = 0; i < cantidad; i++) {
    const numbers = Math.floor(Math.random() * 1000 + 1);
    randomNumbers.push(numbers);
  }
  console.log("Calculo terminado!");
  console.log(randomNumbers);

  const repetidos = {};

  randomNumbers.forEach(function (x) {
    repetidos[x] = (repetidos[x] || 0) + 1;
  });
  console.log(repetidos);

  return repetidos;
};

export default calculoPesado;