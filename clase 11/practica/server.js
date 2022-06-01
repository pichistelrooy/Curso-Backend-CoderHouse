const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const mensajes = [];

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

ioServer.on('connection', (socket) => {
  console.log('Se conectó un usuario');
  socket.on('mensaje', (mensaje) => {
    mensajes.push(`[${socket.id}]: ${mensaje}`);
    ioServer.sockets.emit('mensajes', mensajes.join(`\n`));
  })
});

httpServer.listen(3000, () => {
  console.log('Escuchando!');
});

