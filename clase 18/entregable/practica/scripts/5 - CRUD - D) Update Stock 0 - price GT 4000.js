use ecommerce;

print("Actualizar Stock a 0 con precio > $4000");
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
