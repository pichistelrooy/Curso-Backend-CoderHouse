const yargs = require('yargs');

const argumentos = process.argv.slice(2);
const parsear = yargs(argumentos).default({
  port: 0,
  modo: 'produccion',
  debug: false
}).alias({
  p: "port",
  m: "modo",
  d: "debug"
}).boolean('debug').argv;

const { modo, port, debug, _: otros } = parsear;
console.log({ modo, port, debug, otros });