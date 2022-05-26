const express = require('express');
const app = express();
const fs = require('fs');

app.engine('cte', (pathArchivo, opciones, callback) => {
  const contenidoArchivo = String(fs.readFileSync(pathArchivo));
  const { titulo, mensaje, autor, version } = opciones;
  const renderizado = contenidoArchivo
    .replace('^^titulo$$', titulo)
    .replace('^^mensaje$$', mensaje)
    .replace('^^autor$$', autor)
    .replace('^^version$$', version)
  callback(null, renderizado);
});

app.set('views', './views');
app.set('view engine', 'cte');

app.get('/', (req, res) => {
  res.render('index', { titulo: 'Misery', autor: 'Stephen King', mensaje: 'Una varialbe', version: 'De bolsillo'});
});

app.listen(8080, () => {
  console.log('Escuchando');
});

