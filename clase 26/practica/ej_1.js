require('dotenv').config();
const express = require('express');
const cp = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const usuarios = [];

const generarJwt = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m' });
const validarJwt = (token, cb) => jwt.verify(token, process.env.JWT_SECRET, cb);

app.use(express.json());
app.use(cp());

const resolverUsuario = (req, res, next) => {
  validarJwt(req.cookies.token, (error, contenido) => {
    if (error) {
      req.user = null;
    } else {
      req.user = usuarios.find(usr => usr.usuario === contenido.usuario);
    }
    next();
  });
}

app.get('/registro', (req, res) => {
  const { usuario, password, direccion } = req.query;
  const usuarioExistente = usuarios.find(us => us.usuario === usuario);
  if (usuarioExistente) return res.status(409).send('Ya existe un usuario con ese nombre');
  usuarios.push({ usuario, password, direccion });
  res.send('Registrado!');
});

app.get('/sinAutorizacion', (req, res) => {
  res.send('No estas autenticado');
});

app.get('/', resolverUsuario,(req, res) => {
  if (req.user) return res.send(req.user);
  res.redirect('/sinAutorizacion');
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.send('Deslogueado!');
});

app.get('/login', (req, res) => {
  const { usuario, password } = req.query;
  const usuarioExistente = usuarios.find(usr => usr.usuario === usuario);
  console.log(usuarioExistente);
  if (!usuarioExistente || usuarioExistente.password !== password) return res.status(401).send('Datos incorrectos');
  const token = generarJwt({ usuario });
  res.cookie('token', token);
  res.send('Bienvenido');
});

app.listen(8080, () => {
  console.log('Escuchando!');
});