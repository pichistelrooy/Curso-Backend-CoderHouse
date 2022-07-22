const bienvenida = (req, res, next) => {
  res.send("Bienvenido!");
};

const registracion = (req, res, next) => {
  res.send("Registrado Correctamente!");
};

module.exports = {
  bienvenida,
  registracion,
};
