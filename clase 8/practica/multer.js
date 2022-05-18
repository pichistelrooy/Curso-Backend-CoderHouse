const express = require("express");
const app = express();
const port = 8080;
const multer = require("multer");

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const filename = file.fieldname + "-" + Date.now();
    cb(null, filename);
  },
});

const uploader = multer({ storage: storage });

app.post("/subir", uploader.single("archivo"), (req, res) => {
  res.send("Gracias por subir este archivo");
});

app.get("/subir", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
