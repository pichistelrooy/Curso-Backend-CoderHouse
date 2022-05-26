const express = require('express');
// Cargo el módulo Handlebars
const { engine } = require('express-handlebars');
const app = express();

// Establecemos la conf. del handler
app.engine(
  'hbs',                                          // Nombre de ref. de la plantilla. Se utiliza luego en set.
  engine({                                        // Función de conf. de Handlebars
    extname: '.hbs',                              // Estensión a utilizar, en vez de .handlebars
    defaultLayout: 'index.hbs',                   // Plantilla principal
    //layoutsdir: __dirname + '/views/layout',    // Ruta a la plantilla principal
    //partialDir: __dirname + '/views/partials/'  // Ruta a las plantillas parciales  
  })
);

// Establecemos el motor de plantilla que se va a utilizar
app.set('view engine', 'hbs');
// Establecemos el directorio donde se van a ubicar las plantillas
app.set('views', './hbs_views');
// Espacio público del servidor
//app.set(express.static("public"));

app.get('/', (req, res) => {
  res.render('main', {nombre: 'Ricardo', apellido: 'Ferraris', edad: 31, email: 'test@email.com', telefono: 12345132});
});

app.listen(8080, () => {
  console.log('Escuchando!');
});