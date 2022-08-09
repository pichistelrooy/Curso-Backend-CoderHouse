const minimist = require('minimist');

/*
  Queremos definir el puerto con -p o --port
  Queremos definir si mostramos mensaje cuando arranca el server con --bienvenida --no-bienvenida
  Queremos definir si activamos el loggin verboso con el flag --verboso
*/

const resultado = minimist(process.argv, { alias: { 'p': 'port'}, default: { 'p': 8000 } });

console.log(resultado);