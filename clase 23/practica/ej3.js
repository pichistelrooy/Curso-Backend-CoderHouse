const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

// for invalid routes
app.use(function (req, res) {
  res.json({
    error: "-2",
    description: `route ${req.originalUrl} method ${req.method} not implemented`,
  });
});

app.use(
  session({
    secret: "marcos",
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  if(req.session.contador) {
    req.session.contador++;
    return res.send(`Bienvenido neuvamente ${req.query.nombre || ''} esta es tu visita ${req.session.contador}`);
  } else {
    req.session.contador = 1;
    req.session.nombre = req.query.nombre;
    return res.send(`Bienvenido ${req.query.nombre}`);
  }
})

app.get("/olvidar", (req, res) => {
  req.session.destroy((err => {
    console.log('error!');
    //res.send('Hasta luego!');
    res.redirect('/');
  }))
});
