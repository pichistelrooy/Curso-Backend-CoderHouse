const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const messages = [];
const products = [];

const app = express();
const port = 8080;
const { engine } = require("express-handlebars");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",    
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.set("view engine", "hbs");
app.set("views", "./hbs_views");

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on("connection", (socket) => {
  socket.emit("messages", messages);
  socket.emit("products", products);

  socket.on("new_product", (producto) => {
    let index = 0;
    if (products.length == 0) {
      index = 1;
    } else {
      index = products[products.length - 1].id + 1;
    }
    producto.id = index;

    products.push(producto);    
    socketServer.sockets.emit("products", products);
  });

  socket.on("new_message", (mensaje) => {
    messages.push(mensaje);
    socketServer.sockets.emit("messages", messages);
  });
});

httpServer.listen(port, () => {
  console.log("Estoy escuchando en el puerto 8080");
});

httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/", (req, res) => {
  res.render("main", {listadoProductos: products}); // ACA AGUS, SI NO AGREGO ESTE PARAMETRO, NUNCA ME ACTUALIZA EL #TABLE. me actualiza solo si aprieto f5
});
