const socket = io();

socket.on('mensajes', (mensajes) => {
  document.getElementById("mensajes").textContent = mensajes;
});

document.getElementById("botonEnviar").addEventListener('click', (ev) => {
  const mensaje = document.getElementById("entrada").value;
  socket.emit('mensaje', mensaje);
});