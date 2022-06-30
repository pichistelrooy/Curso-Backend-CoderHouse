var admin = require("firebase-admin");

var serviceAccount = require("./basefirebase-45ca3-firebase-adminsdk-j3iu8-e7cf0579ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://basefirebase-45ca3.firebaseio.com"
});

console.log('Base de datos coenctada');

const probar = async () => {
  const db = admin.firestore();
  const query = db.collection("colores");

  
  //1) Agregar todos los colores 
  const red = query.doc('red');
  await red.create({ nombre: "red" });

  const green = query.doc('green');
  await green.create({ nombre: "green" });

  const blue = query.doc('blue');
  await blue.create({ nombre: "blue" });

  console.log('Documentos creados!');

  //2) Listar todos los docs
  const resultados = (await query.get()).docs;
  console.log(resultados.map(resultado => resultado.data()));
 
  //3) Modificar blue por navy
  const doc = query.doc('blue');
  await doc.update({ nombre: 'navy' });
  console.log('Nombre modificado');

  //4) Borrar el color green
  const doc1 = query.doc('green');
  await doc1.delete();
  console.log('Color borrado');
}

probar();