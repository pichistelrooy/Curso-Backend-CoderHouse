require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generarJwt = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h'});

const verificarJwt = (token) => jwt.verify(token, JWT_SECRET, (err, contenido) => {
  if (err) throw new Error('Token invalido');
  return contenido;
});

app.post('/login', (req, res) => {
  const { user, password } = req.body;
  if (user == 'richard' && password == 'coder') {
    const token = generarJwt({ user });
    return res.send({ token });
  }
  res.status(401);
});

const tokenValido = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];
  try {
    verificarJwt(token);
    next();
  } catch (error) {
    next(error);
  }
}

app.get('/verificar', tokenValido, (req, res) => {
  res.send('Esto es valido');
});

app.listen(8080, () => {
  console.log('Escuchando!');
});

