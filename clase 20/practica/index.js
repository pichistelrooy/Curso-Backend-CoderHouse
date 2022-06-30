const mongoose = require("mongoose");
const ejectuar = async () => {
  mongoose.connect('mongodb+srv://pichistelrooy:marcos123@cluster0.alqfdri.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if(err) throw new Error(`Error conectandose ${err}`)
    console.log('Base de Datos coenctada');
  })
};
ejectuar();clearImmediate