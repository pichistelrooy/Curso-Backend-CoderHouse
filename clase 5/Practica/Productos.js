const productos = [
    { id:1, nombre:'Escuadra', precio:239.50 }, 
    { id:2, nombre:'Calculadora', precio:15.67 }, 
    { id:3, nombre:'Globo Terraqueo', precio:100 }, 
    { id:4, nombre:'Paleta Pintura', precio:70.30 }, 
    { id:5, nombre:'Reloj', precio:90.50 }, 
    { id:6, nombre:'Agenda', precio:100.50 }, 
];


const nombres = (productos) => {
    const soloNombres = productos.map(function(producto) {
        return producto.nombre;
    })
    return soloNombres.join(',');
}

nombres();