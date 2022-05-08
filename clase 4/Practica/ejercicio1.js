
const mostrarIntervalado = (mensaje, intervalo, callback) => {
  let posicionActual = 0;
  const intervalId = setInterval(() => {
    console.log(mensaje[posicionActual]);
    posicionActual++;
    if (posicionActual == mensaje.length) {
      clearInterval(intervalId);
      callback();
    }
  }, intervalo);
};

/*for (let i = 0; i < mensaje.length; i++) {
  setTimeout(() => {}, 1000);
};*/

mostrarIntervalado('HOLA', 250, () => {
  console.log('Finalizado 250');
});

mostrarIntervalado('HOLA', 500, () => {
  console.log('Finalizado 500');
});

mostrarIntervalado('HOLA', 1000, () => {
  console.log('Finalizado 1000');
});
