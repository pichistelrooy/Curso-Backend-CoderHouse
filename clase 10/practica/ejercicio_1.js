const express = require('express');
const app = express();

app.set('views', './pug_views');
app.set('view engine', 'pug');

app.get('/datos', (req, res) => {
  const { min, nivel, max, titulo } = req.query;
  res.render('datos', { min, nivel, max, titulo });
});

app.listen(8080, () => {
  console.log('Estoy escuchando');
});