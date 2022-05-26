const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const personas = [];

app.set('views', './ejs_views');
app.set('view engine', 'ejs');

app.get('/formulario', (req, res) => {
  res.render('views/formulario', {personas});
});

app.post('/personas', (req, res) => {
  const { nombre, apellido, edad} = req.body;
  personas.push({nombre, apellido, edad});
  res.redirect('/formulario');
});

app.listen(8080, () => {
  console.log('Escuchando!');
});