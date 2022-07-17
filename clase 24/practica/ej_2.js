const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis');
const cookieParser = require('cookie-parser');

const client = redis.createClient({ legacyMode: true });
const RedisStore = redisStore(session);
const app = express();
app.use(cookieParser());

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    ttl: 60,
    client
  }),
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

client.connect().then(() => {
  app.listen(8080, () => {
    console.log('Escuchando!');
  });
});
