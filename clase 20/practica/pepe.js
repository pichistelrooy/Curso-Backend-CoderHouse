
const motorAUsar = process.env.MOTOR;

if (motorAUsar === 'firebase') {
  ContenedorProductos = ContenedorPRoductosFirebase;
}

module.exports = {
  ContenedorProductos,
  ContenedorCarrito
}