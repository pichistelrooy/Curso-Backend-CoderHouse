const express = require("express");
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

// for invalid routes
app.use(function (req, res) {
  res.json({
    error: "-2",
    description: `route ${req.originalUrl} method ${req.method} not implemented`,
  });
});

router.post("/cookies", (req, res) => {
  const {nombre, valor, duracion} = req.body;
  res.cookie(nombre, valor, {signed: true}).send("Cookie set");
});

router.get("/cookies", (req, res) => {
  res.send(req.cookies);
});

router.get("/cookies/:nombre", (req, res) => {
  res.clearCookie(req.params.nombre).send("Cookie cleared");
});

/*router.get("/set", (req, res) => {
  res.cookie("server", "express", { maxAge: duracion * 1000 }).send("Cookie set");
});

router.get("/setEx", (req, res) => {
  res.cookie("server2", "express2", { maxAge: 30000 }).send("Cookie setEx");
});



router.get("/getex", (req, res) => {
  res.send(req.cookies.server2);
});

router.get("/clr", (req, res) => {
  res.clearCookie("server").send("Cookie cleared");
});*/
