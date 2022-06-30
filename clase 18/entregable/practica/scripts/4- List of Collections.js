use ecommerce;

print("Listado mensajes");
db.mensajes.find().pretty();

print("Listado productos");
db.productos.find().pretty()



