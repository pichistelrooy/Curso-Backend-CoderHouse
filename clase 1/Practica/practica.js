let nombre = 'Marcos';
let edad = 31;
let precio = 999.25;
let seriesFav = ['Dark','Homeland','Los Simpsons'];

let misPeliculasFav = [
    {
        nombre : '2012', 
        año : 2011, 
        protagonistas : ['The Rock', 'Girl of baywatch']
    },
    {
        nombre : 'Constantine', 
        año : 2008, 
        protagonistas : ['Keanu Reeves', 'Lucifer']
    }
];


console.log(nombre);
console.log(edad);
console.log(precio);
console.log(seriesFav);
console.log(misPeliculasFav);

edad = edad + 1;

console.log(edad);

seriesFav.push('Los 100');

console.log(seriesFav);