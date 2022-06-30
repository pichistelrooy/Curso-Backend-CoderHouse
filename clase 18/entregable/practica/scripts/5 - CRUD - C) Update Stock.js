use ecommerce;

print("Actualizar Stock a 100");
db.productos.updateMany({}, {$set: {stock: 100}});
