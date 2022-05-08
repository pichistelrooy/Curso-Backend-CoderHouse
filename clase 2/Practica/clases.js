class Contador {

    static totalcontador = 0;

    constructor (responsable){
        this.responsable = responsable;
        this.cont = 0;                  
    }

    aumentarCuenta(cantidad) {
        this.cont = this.cont + cantidad;
        Contador.totalcontador = Contador.totalcontador + cantidad;
    }    
}

const contadorUno = new Contador('Marcos');
const contadorDos = new Contador('Juan');
contadorUno.aumentarCuenta(50);
contadorDos.aumentarCuenta(100);

console.log('Cuenta de Cotnador 1: ' + contadorUno.cont);
console.log('Cuenta de Contador 2: ' + contadorDos.cont);
console.log('Suma total: ' + Contador.totalcontador);