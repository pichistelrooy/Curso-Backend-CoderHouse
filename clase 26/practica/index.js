require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./passport');

const app = express();

app.use(session({
  secret: 'richard',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

app.get('/success', (req, res) => {
  res.send('Bienvenido');
});

app.get('/prueba', (req, res) => {
  res.send(req.user);
});

app.listen(3000, () => {
  console.log('Escuchando!');
});