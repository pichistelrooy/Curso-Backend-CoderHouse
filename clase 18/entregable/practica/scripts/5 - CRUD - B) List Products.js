use ecommerce;

let nombre = 'Te';
print("Buscar producto por nombre: ",nombre);
db.productos.find({title: nombre});

print("A) listando productos < $1000");
db.productos.find({"price": {$lt: 1000}});

print("B) listando productos entre $1000 y #3000");
db.productos.find({$and: [{"price": {$gte: 1000}}, {"price": {$lte: 3000}}]});

print("C) listando productos > $3000");
db.productos.find({"price": {$gt: 3000}});

print("D) listando el 3er producto mas barato");
db.productos.find().sort({price:1}).skip(2).limit(1);