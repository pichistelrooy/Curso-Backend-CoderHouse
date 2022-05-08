function mostrarLista(lista) {
    if (lista.length > 0) {
        console.log(lista);
    } else {
        console.log('Lista vacia');
    }
};

mostrarLista([1,2,3]);
mostrarLista([]);



(function mostrarLista(lista) {
    if (lista.length > 0) {
        console.log(lista);
    } else {
        console.log('Lista vacia');
    }
})([1,2,3]);


function crearMultiplicador(multiplicador) {
    return function(numero) {
        return numero * multiplicador;
    };
};

const multiplicadorPor10 = crearMultiplicador(10);
console.log(multiplicadorPor10(20));

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log(duplicar(20));
console.log(triplicar(30));