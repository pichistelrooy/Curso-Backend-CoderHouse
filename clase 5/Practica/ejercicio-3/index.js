/*
Una vez dentro de este directorio recuerden correr npm install,
de lo contrario no va a encontrar la dependencia moment.
*/

const moment = require('moment');

const fechaDeHoy = moment();
const fechaNacimiento = moment("1990-11-07");

console.log('Hoy es', fechaDeHoy.format("DD/MM/YYYY"));
console.log('Naci el', fechaNacimiento.format("DD/MM/YYYY"));
console.log('Desde mi nacimiento han pasado', fechaDeHoy.diff(fechaNacimiento, 'years'), 'años');
console.log('Desde mi nacimiento han pasado', fechaDeHoy.diff(fechaNacimiento, 'days'), 'dias');