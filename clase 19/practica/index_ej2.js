const mongoose = require("mongoose");

const ejecutar = async () => {

  await mongoose.connect("mongodb://localhost:27017/estudiantes");

  const estudSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true }
  });

  const Estudiante = mongoose.model("estud", estudSchema);

  
  let res = await Estudiante.find().sort({ nombre: 1 });
  console.log('Ordenado alfabeticamente: ' + res);
  
  res = await Estudiante.find().sort({ edad: 1 }).limit(1);
  console.log('Mas Joven: ' + res);

  res = await Estudiante.find({ curso: "2A" });
  console.log('2A: ' + res);
  
  res = await Estudiante.find().sort({ edad: 1 }).skip(1).limit(1);
  console.log('Mas Joven: ' + res);
  
  res = await Estudiante.find({}, {nombre: 1, apellido: 1, curso: 1, _id: 0}).sort({ apellido: -1 });
  console.log('largoclear: ' + res);
  
  res = await Estudiante.find({ nota: 10 });
  console.log('Nota 10: ' + res);

  res = await Estudiante.aggregate([
    {
      $group: {
        "_id": null,
        "promedio": {
          $avg: "$nota"
        }
      }
    }
  ]);

  console.log('promedio nota: ' + res);

  console.log("Proceso terminado");

}

ejecutar();