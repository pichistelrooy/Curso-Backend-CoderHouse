const resultados = {};

for (let i = 0; i < 10000; i++) {
  const numeroAleatorio = (Math.floor(Math.random()*20))+1;
  if (resultados[numeroAleatorio]) resultados[numeroAleatorio]++;
  else resultados[numeroAleatorio] = 1;
}

console.log(resultados);