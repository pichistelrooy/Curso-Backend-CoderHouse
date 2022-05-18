const express = require("express");
const app = express();
const port = 8080;
const routerMascotas = express.Router();
const routerPersonas = express.Router();

const listaMascotas = [];
const listaPersonas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

routerMascotas.get('/', (req, res) => {
  res.send({mascotas: listaMascotas});
})

routerPersonas.get('/', (req, res) => {
  res.send({personas: listaPersonas});
});

routerMascotas.post('/', (req, res) => {
  console.log(req.body);
  listaMascotas.push(req.body);
  res.send('body impreso');
})

routerPersonas.post('/', (req, res) => {
  console.log(req.body);
  listaPersonas.push(req.body);
  res.send('body impreso');
});


