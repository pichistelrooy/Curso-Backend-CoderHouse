const express = require('express');
const { Server } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();

app.use(express.static('public'));

const httpServer = new Server(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', (socket) => {
  socket.emit('producto', {nombre: 'Mi Producto', precio: 20.50});
});

httpServer.listen(8080, () => {
  console.log('Server escuchando!');
});