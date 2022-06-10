const { request, response } = require('express');

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {*} next 
 */
const validarLogueado = (req, res, next) => {
  const tokenDeUsuario = req.header('X-Coder-Token');
  const rolDelUsuario = req.header('X-Coder-Role');
  if (tokenDeUsuario) {
    // Le consultamos a la API
    req.rolUsuario = rolDelUsuario;
    next();
  }
  else res.status(401).send('Sin autorizacion');
};

module.exports = validarLogueado;