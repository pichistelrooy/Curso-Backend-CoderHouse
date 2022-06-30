use ecommerce;

print("Borrar productos con precio < $1000");
db.productos.deleteMany({price: {$lt: 1000}});
