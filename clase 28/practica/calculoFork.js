const { calculoPesado } = require('./calculo');

process.on('message', (msj) => {
  if (msj === 'empezar') {
    calculoPesado();
    process.send('termine');
  }
});