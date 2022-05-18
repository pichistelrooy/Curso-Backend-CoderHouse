const express = require("express");
const app = express();
const port = 8080;

app.use('/archivos', express.static('public'));

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
