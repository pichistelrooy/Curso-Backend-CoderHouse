//Iniciar servidor previamente con ./mongod --auth --dbpath path

use ecommerce;

print("manipulando Datos");
db.productos.insertOne({title: "holaaaa"})