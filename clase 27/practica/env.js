const dotenv = require('dotenv');
dotenv.config({ path: 'pepe.env' });

const { PORT, DEBUG, MODO } = process.env;

console.log({
  port: PORT || 0,
  modo: MODO || 'prod',
  debug: DEBUG || false
});