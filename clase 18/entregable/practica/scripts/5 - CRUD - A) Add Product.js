use ecommerce;

let titulo = "roast beeff";
let precio = 2750;
let cantidad = 250;
let foto = 'www.producto.com';

print("Agregando producto");
db.productos.insertOne( {title: titulo, price: precio, stock: cantidad, thumbnail: foto});



