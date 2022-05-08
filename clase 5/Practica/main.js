function aleatorio(min, max){
    let cont = 0;
    let  numeros = [];

    while (cont < 20) {
        numeros.push(Math.floor(Math.random() * ((max + 1)-min) + min));
        cont = cont + 1;        
    } 

    console.log(numeros);
}

aleatorio(1,10000);