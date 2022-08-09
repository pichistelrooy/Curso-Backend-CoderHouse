const { fork } = require('child_process');
const express = require('express');
const { calculoPesado } = require('./calculo');

const app = express();
let contador = 0;

app.get('/', (req, res) => {
  contador++;
  res.send({ contador });
});

app.get('/for-bloqueante', (req, res) => {
  calculoPesado();
  res.send('Calculo terminado');
});

app.get('/for-no-bloqueante', (req, res) => {
  const forkeado = fork('./calculoFork.js');
  forkeado.send('empezar');
  forkeado.on('message', (msj) => {
    if (msj === 'termine') res.send('Calculo terminado');
  });
});

app.listen(8080, () => {
  console.log('Escuchando!');
});