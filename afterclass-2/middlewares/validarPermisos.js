const { request, response } = require('express');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {*} next 
 */
const validarPermisos = (rolRequerido) => {
  return (req, res, next) => {
    if (req.rolUsuario == rolRequerido) next();
    else res.status(403).send('Este usuario no tiene permisos');
  }
};

module.exports = validarPermisos;