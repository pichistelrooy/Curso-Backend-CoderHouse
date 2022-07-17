const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis');
const redis = require('redis');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const client = redis.createClient();
const RedisStore = redisStore(session);

app.use(session({
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: 'redis-15191.c99.us-east-1-4.ec2.cloud.redislabs.com',
    port: 15191,
    pass: 'fKfU6xbKQxVWoqI6ch2xk9KC8RWFkUbb',
    ttl: 300,
    client: client
  }),
  secret: 'richard'
}));

app.get('/', (req, res) => {
  console.log('request recibida');
  req.session.user = 'richard';
  console.log('guardado!');
  res.send('Session seteada');
});

client.connect().then(() => {
  app.listen(8080, () => console.log('Escuchando!'));
});