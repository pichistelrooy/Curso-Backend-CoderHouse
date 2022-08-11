import calculoPesado from "./calculo.js";

process.on("message", (cantidad) => {
  const randomNumbers = calculoPesado(cantidad);
  process.send(randomNumbers);
});

process.on('message', (msj) => {
  if (msj === 'empezar') {
    calculoPesado();
    process.send('termine');
  }
});