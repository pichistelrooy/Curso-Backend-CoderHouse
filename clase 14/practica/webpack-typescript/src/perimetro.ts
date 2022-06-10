class Perimetro {

  static cuadrado(lado: number) {
    return 4*lado;
  }

  static rectangulo(ladoUno: number, ladoDos: number) {
    return 2*(ladoUno+ladoDos)
  }

  static circulo(radio: number) {
    return 2*Math.PI*radio;
  }
}

export { Perimetro }