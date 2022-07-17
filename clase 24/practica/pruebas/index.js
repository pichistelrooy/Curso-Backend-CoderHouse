const express = require('express');
const session = require('express-session');
const cp = require('cookie-parser');
const redis = require('redis');
const redisStore = require('connect-redis');
const fileStore = require('session-file-store');
const MongoStore = require('connect-mongo');
const FileStore = fileStore(session);
const client = redis.createClient({ legacyMode: true });

const RedisStore = redisStore(session);
const app = express();
app.use(cp());

app.use(session({
  store: new MongoStore({
    mongoUrl: 'mongodb://localhost/sesiones'
  }),
  secret: 'secreto',
  resave: true,
  saveUninitialized: true
}));

app.get('/prueba', (req, res) => {
  req.session.user = 'Richard';
  res.send();
});

app.get('/session', (req, res) => {
  res.send(req.session);
});

app.listen(8080, () => console.log('Escuchando!'));

/*
client.connect().then((() => {
  app.listen(8080, () => console.log('Escuchando!'));
}));

*/