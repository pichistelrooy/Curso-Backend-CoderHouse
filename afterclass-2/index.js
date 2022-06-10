const express = require('express');
const app = express();
const routerPublico = require('./routerPublico');

app.use('/public', routerPublico);

app.get('/otra', (req, res) => {
  res.send('Otra ruta');
});

app.listen(8080, (error) => {
  console.log(error);
  console.log('Escuchando!');
});