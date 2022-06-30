const mongoose = require("mongoose");
const estudiantesAImportar = require("./users.json");

const ejecutar = async () => {

  await mongoose.connect("mongodb://localhost:27017/estudiantes");
  console.log("Estamos conectados");

  const estudSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true }
  });

  const Estudiante = mongoose.model("estud", estudSchema);

  for (let i = 0; i < estudiantesAImportar.length; i++) {
    const estudianteAGuardar = new Estudiante(estudiantesAImportar[i]);
    await estudianteAGuardar.save();
  }

  console.log("Proceso terminado");

}

ejecutar();