const express = require('express');
const app = express();

const puerto = process.env.PORT /*|| Number(process.argv[2])*/ || 8080;
console.log(process.env.PORT);
const processId = process.pid;

app.get('/', (_, res) => {
  res.send(`Servidores express - Puerto ${puerto} - PID ${processId} - Fecha y hora ${(new Date().toLocaleString())}`)
});

app.listen(puerto, () => {
  console.log(`Escuchando en ${puerto}`);
});