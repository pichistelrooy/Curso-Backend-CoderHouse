const express = require('express');
const app = express();

const middlewareAutenticacion = (req, res, next) => {
  req.user = {
    fullName: 'Ricardo Ferraris',
    isAdmin: true
  };
  next();
}

const middlewareAutorizacion = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.status(403).send('Vos no tenes permisos');
}

app.use((req, res, next) => {
  console.log('Este es el principio');
  next();
});

app.get('/public', middlewareAutenticacion, (req, res) => {
  res.send('Esta ruta esta desprotegida');
});

app.get('/private', middlewareAutenticacion, middlewareAutorizacion, (req, res) => {
  res.send('Esta ruta es privada');
});

app.use((req, res) => {
  res.status(404).send("No le pegue a ninguna ruta");
});

app.listen(8080, () => {
  console.log('Escuchando!');
});