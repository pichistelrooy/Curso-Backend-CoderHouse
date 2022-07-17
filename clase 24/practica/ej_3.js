const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

const app = express();
app.use(cookieParser());

app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sesiones' }),
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
