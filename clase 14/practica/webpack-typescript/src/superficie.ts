class Superficie {

  static cuadrado(lado: number) {
    return lado*lado;
  }

  static rectangulo(ladoUno: number, ladoDos: number) {
    return ladoUno*ladoDos;
  }

  static circulo(radio: number) {
    return Math.PI*Math.pow(radio, 2)
  }
}

export { Superficie }