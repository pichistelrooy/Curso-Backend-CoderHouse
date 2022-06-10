const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const { productRouter } = require("./routers/routerProductos.js");
const { carritoRouter } = require("./routers/routerCarrito.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);
app.use("/api/carrito", carritoRouter);

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
