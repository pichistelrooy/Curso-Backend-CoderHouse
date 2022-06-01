const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const messages = [];

const app = express();
app.use(express.static('public'));

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', (socket) => {
  socket.emit('messages', messages);

  socket.on('new_message', (mensaje) => {
    messages.push(mensaje);
    socketServer.sockets.emit('messages', messages);
  });
  
});

httpServer.listen(8080, () => {
  console.log('Estoy escuchando en el puerto 8080');
});