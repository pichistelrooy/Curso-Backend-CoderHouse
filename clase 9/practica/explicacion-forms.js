const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/datos', (req, res) => {
  res.send(req.body);
});

app.listen(8080, () => {
  console.log('Escuchando!');
});