use ecommerce;

print("agregando Productos");
db.productos.insertMany([
    {title: 'Cafe', price: 170, stock: 1, thumbnail: 'www.foto.com'},
    {title: 'Te', price: 4800, stock: 2, thumbnail: 'www.foto.com'},
    {title: 'Yerba', price: 200, stock: 3,thumbnail: 'www.foto.com'},
    {title: 'Salchicas', price: 2750, stock: 7, thumbnail: 'www.foto.com'},
    {title: 'Hamburguesas', price: 230, stock: 8, thumbnail: 'www.foto.com'},
    {title: 'Jabon liquido', price: 560, stock: 10, thumbnail: 'www.foto.com'},
    {title: 'Desodorante', price: 125, stock: 15,thumbnail: 'www.foto.com'},
    {title: 'Galletitas', price: 3900, stock: 23, thumbnail: 'www.foto.com'},
    {title: 'Hummus', price: 120, stock: 345,thumbnail: 'www.foto.com'},
    {title: 'Aceite', price: 130, stock: 127, thumbnail: 'www.foto.com'},
 ] );


print("Agregando Mensajes");
db.mensajes.insertOne({author: 'Marcos', text: 'buen dia', date: new Date() });
db.mensajes.insertOne({author: 'Pepe', text: 'holas, como estas?', date: new Date() });
db.mensajes.insertOne({author: 'Marcos', text: 'bien, vos?', date: new Date() });
db.mensajes.insertOne({author: 'Pepe', text: 'todo bien, que necesitas?', date: new Date() });
db.mensajes.insertOne({author: 'Marcos', text: 'tuve un problema con el producto', date: new Date() });
db.mensajes.insertOne({author: 'Pepe', text: 'decime', date: new Date() });
db.mensajes.insertOne({author: 'Marcos', text: 'lo prendi y pego un chispazo y olor a quemado', date: new Date() });
db.mensajes.insertOne({author: 'Pepe', text: 'bueno, tenes fotos para enviarme', date: new Date() });
db.mensajes.insertOne({author: 'Marcos', text: 'si, ya te las envio. Gracias', date: new Date() });
db.mensajes.insertOne({author: 'Pepe', text: 'a vos', date: new Date() });



