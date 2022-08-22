const express = require('express');
const compression = require('compression');

let saludo = '';

for (let i = 0; i < 1000; i++) {
  saludo += 'Hola que tal';
}

const app = express();

app.get('/saludo', (req, res) => {
  res.send(saludo)
});

app.get('/saludoGzip', compression(), (req, res) => {
  res.send(saludo);
});

app.listen(3000, () => {
  console.log('Escuchando!');
});