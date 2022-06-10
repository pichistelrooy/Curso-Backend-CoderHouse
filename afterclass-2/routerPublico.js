const { Router } = require('express');
const validarLogueado = require('./middlewares/validarLogueado');
const validarPermisos = require('./middlewares/validarPermisos');
const router = Router();

router.use(validarLogueado, validarPermisos('public'));

router.get('/uno', (req, res) => {
  res.send('uno');
});

router.get('/dos', (req, res) => {
  res.send('dos');
});

module.exports = router;