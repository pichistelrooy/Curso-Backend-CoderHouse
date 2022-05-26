const express = require("express");

const app = express();
const port = 8080;
const router = express.Router();

const Contenedor = require("../contenedor.js");
const { engine } = require("express-handlebars");

// Establecemos la conf. del handler
app.engine(
  "hbs", // Nombre de ref. de la plantilla. Se utiliza luego en set.
  engine({
    // Función de conf. de Handlebars
    extname: ".hbs", // Estensión a utilizar, en vez de .handlebars
    defaultLayout: "index.hbs", // Plantilla principal
    //layoutsdir: __dirname + '/views/layout',    // Ruta a la plantilla principal
    //partialDir: __dirname + '/views/partials/'  // Ruta a las plantillas parciales
  })
);

//descubri que, si seteaba estos use, despues del app.use(router), el router no comprendia el json y el urlencoded. SI o SI antes de la asignacion del router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
// Establecemos el motor de plantilla que se va a utilizar
app.set("view engine", "hbs");
// Establecemos el directorio donde se van a ubicar las plantillas
app.set("views", "./hbs_views");

app.use("/productos", router);

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

router.get("/", (req, res) => {
  const contenedor = new Contenedor();
  const productos = contenedor.getAll();
  res.render("main", { productos: productos });
});

router.post("/", (req, res) => {
  const contenedor = new Contenedor();
  const product = req.body;

  if (
    product.title === "" ||
    product.price === "" ||
    product.thumbnail === ""
  ) {
    res
      .status(400)
      .send({ error: "El producto no se pudo cargar, hay campos vacios" });
  } else {
    contenedor.add(product);
    res.redirect("/");
  }
});
