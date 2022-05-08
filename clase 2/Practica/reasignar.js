const persona = { nombre: 'Richard' }

function reasignarObjeto(args) {
    args = { nombre: 'pepe' }
    console.log(args);
}

reasignarObjeto(persona);

console.log(persona);

persona.nombre = 'pepito';

console.log(persona);