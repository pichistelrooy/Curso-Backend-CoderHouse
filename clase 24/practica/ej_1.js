const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const FileStore = fileStore(session);

app.use(session({
  store: new FileStore({ path: './sesiones', ttl: 60 }),
  secret: 'richard',
  resave: true,
  cookie: {
    maxAge: 60000
  },
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    return res.send(`Bienvenido nuevamente ${req.session.nombre || ''} esta es tu visita ${req.session.contador}`);
  } else {
    req.session.contador = 1;
    req.session.nombre = req.query.nombre;
    return res.send(`Bienvenido ${req.query.nombre || ''}`);
  }
});

app.get('/olvidar', (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
});

app.listen(8080, () => {
  console.log('Escuchando!');
});