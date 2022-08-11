const dotenv = require('dotenv');
//dotenv.config({ path: 'pepe.env' });
dotenv.config();

const { PORT, DEBUG, MODO } = process.env;

console.log({
  port: PORT || 0,
  modo: MODO || 'prod',
  debug: DEBUG || false
});

// EJEMPLO CONSOLA $env:NODE_ENV="dev"