const express = require('express');
const app = express();

const miEstatico = (req, res) => {
  res.sendFile(__dirname + '/public/' + req.params.fileName);

}

app.get('/:fileName', miEstatico);

// Alternativa:
// app.use(express.static('public'));

app.listen(8080, () => {
  console.log('Escuchando');
});