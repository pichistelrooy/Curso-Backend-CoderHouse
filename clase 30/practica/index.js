const express = require('express');
const app = express();

const puerto = parseInt(process.argv[2]);
const processId = process.pid;

if (!puerto) throw new Error('El puerto no está definido');

// app.use(express.static('/opt/homebrew/var/www'));

app.get('/datos', (req, res) => {
  res.send(`NGINX corriendo en el puerto ${puerto} con PID ${processId}`);
});

app.listen(puerto,  () => {
  console.log(`Escuchando en ${puerto}`);
});