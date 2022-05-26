const express = require('express');
const app = express();

app.set('views', './pug_views');
app.set('view engine', 'pug');

app.get('/hello', (req, res) => {
  res.render('bienvenida', { mensaje: 'Este es un mensaje de bienvenida' });
});

app.listen(8080, () => {
  console.log('Estoy escuchando!');
});