const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store');
const cookieParser = require('cookie-parser');
const FileStore = fileStore(session);

const app = express();

app.use(cookieParser());

app.use(session({
  secret: 'richard',
  saveUninitialized: true,
  resave: true,
  store: new FileStore({ path: './sessions', ttl: 60, retries: 0})
}));

app.get('/alterarSesion', (req, res) => {
  req.session.user = 'richard';
  res.send();
});

app.get('/obtenerSesion', (req, res) => {
  res.send(req.session);
});

app.listen(8080, () => console.log('Escuchando!'));

