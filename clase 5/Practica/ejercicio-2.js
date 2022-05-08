const productos = [
  { id: 1, nombre: 'Calculadora', precio: 20.50},
  { id: 2, nombre: 'Lapicera', precio: 10.10},
  { id: 3, nombre: 'Sacapuntas', precio: 5.75}
];

const obtenerNombresString = (arrProductos) => {
  const nuevoArrayNombres = arrProductos.map(producto => {
    return producto.nombre;
  });
  return nuevoArrayNombres.join(',');
};

const obtenerTotal = (arrProductos) => {
  const total = arrProductos.reduce((valorAnterior, producto) => {
    return valorAnterior+producto.precio;
  }, 0);
  return total;
}

const obtenerPromedio = (arrProductos) => {
  const total = obtenerTotal(arrProductos);
  return (total / arrProductos.length).toFixed(2);
}

const obtenerMenorPrecio = (arrProductos) => {
  const menorPrecio = arrProductos.reduce((valorInicial, producto) => {
    if (!valorInicial) return producto;
    else {
      if (valorInicial.precio < producto.precio) return valorInicial;
      return producto;
    }
  }, {});
  return menorPrecio;
}

const obtenerMayorPrecio = (arrProductos) => {
  const mayorPrecio = arrProductos.reduce((valorInicial, producto) => {
    if (!valorInicial) return producto;
    else {
      if (valorInicial.precio > producto.precio) return valorInicial;
      return producto;
    }
  }, {});
  return mayorPrecio;
}

const resultado = {
  obtenerNombreString: obtenerNombresString(productos),
  total: obtenerTotal(productos),
  promedio: obtenerPromedio(productos),
  productoMenorPrecio: obtenerMenorPrecio(productos),
  productoMayorPrecio: obtenerMayorPrecio(productos)
};

console.log(resultado);
