const cluster = require('cluster');
const express = require('express');
const os = require('os');

const numeroCpus = os.cpus().length;
const processId = process.pid;
const puerto = Number(process.argv[2]) || process.env.PORT || 8080;
const isMaster = cluster.isMaster;

console.log(`Proceso: ${processId} - isMaster: ${isMaster}`);

if (cluster.isMaster) {
  for (let i = 0; i < numeroCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`Proceso worker con PID ${worker.process.pid} salio`);
  });
} else {
  const app = express();
  app.get('/', (_, res) => {
    res.send(`Servidores express - Puerto ${puerto} - PID ${processId} - Fecha y hora ${(new Date().toLocaleString())}`)
  });
  app.listen(puerto, () => {});
}