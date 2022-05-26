const express = require('express');
const app = express();
const fs = require('fs');

app.engine('coder', (pathArchivo, options, callback) => {
  const contenido = String(fs.readFileSync(pathArchivo));
  const contenidoReemplazado = contenido.replace('$$titulo$$', options.titulo);
  callback(null, contenidoReemplazado);
});

app.set('views', './coder_views');
app.set('view engine', 'coder');

app.get('/saludo', (req, res) => {
  res.render('pagina', { titulo: 'El titulo de mi pagina'});
});

app.listen(8080, () => {
  console.log('Escuchando!');
});