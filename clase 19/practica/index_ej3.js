const mongoose = require("mongoose");

const ejecutar = async () => {

  await mongoose.connect("mongodb://localhost:27017/estudiantes");

  const estudSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true },
    ingreso: { type: Boolean, required: true }
  });

  const Estudiante = mongoose.model("estud", estudSchema);

  console.log(await Estudiante.updateOne({ nombre: 'Lucas', apellido: 'Blanco'}, { $set: { dni: '20355875'}}));

  console.log(await Estudiante.updateMany({}, {$set: { ingreso: false }}));

  console.log(await Estudiante.updateMany({ curso: "1A"}, { $set: { ingreso: true }}));

  console.log(await Estudiante.find({ nota: { $gte: 4}}, {_id: 0, __v: 0}));

  console.log(await Estudiante.find({ ingreso: true }, { _id: 0, __v: 0}));

  console.log(await Estudiante.deleteMany({ ingreso: true }));

  const todos = await Estudiante.find();

  todos.forEach((estud) => {
    console.log(estud, "Fecha creación: ", estud._id.getTimestamp().toLocaleString());
  });

}

ejecutar();