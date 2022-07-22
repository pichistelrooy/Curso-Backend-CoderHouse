const express = require('express');
const session = require('express-session');
const passport = require('./passport');
const app = express();

app.use(session({
  secret: 'richard',
  saveUninitialized: false,
  resave: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/yo', (req, res) => {
  console.log(req.user);
  res.send(req.session);
});

app.post('/registro', /*passport.authenticate('registro', { failureRedirect: '/'}),*/ (req, res) => {  
  console.log(`user:  ${req.user}`);
  console.log(req.isAuthenticated());
  res.send('Registrado OK');
});

app.post('/login', passport.authenticate('login', { failureRedirect: '/'}), (req, res) => {  
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.send('hola');
});

app.post('/', passport.authenticate('signup'), (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.send('user signed up ok');
});

app.get('/', (req, res) => {
  res.send('error');
});

app.listen(8080, () => {
  console.log('pepito');
});