import express from 'express';
import { Perimetro } from './perimetro';
import { Superficie } from './superficie';

const app = express();

app.get('/cuadrado', (req, res) => {
  const { lado } = req.query;
  const superficie = Superficie.cuadrado(Number(lado));
  const perimetro = Perimetro.cuadrado(Number(lado));
  res.send({ superficie, perimetro });
});

app.get('/rectangulo', (req, res) => {
  const { ladoUno, ladoDos } = req.query;
  const superficie = Superficie.rectangulo(Number(ladoUno), Number(ladoDos));
  const perimetro = Perimetro.rectangulo(Number(ladoUno), Number(ladoDos));
  res.send({ superficie, perimetro });
});

app.get('/circulo', (req, res) => {
  const { radio } = req.query;
  const superficie = Superficie.circulo(Number(radio));
  const perimetro = Perimetro.circulo(Number(radio));
  res.send({ superficie, perimetro });
});

app.listen(8080, () => {
  console.log('Escuchando!');
});