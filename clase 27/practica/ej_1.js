const minimist = require('minimist');

const argumentos = process.argv.slice(2);
const parseado = minimist(argumentos, { alias: { 'm': 'modo', 'p': 'port', 'd': 'debug' }, default: { debug: false, port: 0, modo: 'produccion' }});
const { modo, port, debug, _ } = parseado;
console.log({ modo, port, debug, otros: _ });
