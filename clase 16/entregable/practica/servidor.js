const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const MariaDB = require("./persistencia/MariaDB.js");
const sqLite = require("./persistencia/sqLite.js");

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
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", express.static("public"));
app.set("view engine", "hbs");
app.set("views", "./hbs_views");

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

let messages = [];
let products = [];

const optionsMariaDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "test",
  },
};

const optionsSqLite = {
  filename: "./ecommerce/mydb.sqlite",
};
const client = "sqlite3";

// creo bd sqLite
async function crearBDsqLite() {
  const sqlite = new sqLite(client, optionsSqLite);
  await sqlite.crearBD();
}

// llamo a sqLite e inicializo tabla messages
crearBDsqLite();

// creo bd MariaDB
async function crearBDMariaDB() {
  const mariaDB = new MariaDB(optionsMariaDB);
  await mariaDB.inicializarBD();
}

// llamo a sqLite e inicializo tabla messages
crearBDMariaDB();

socketServer.on("connection", (socket) => {
  socket.emit("messages", messages);
  socket.emit("products", products);

  socket.on("new_product", (producto) => {
    const mariaDB = new MariaDB(optionsMariaDB);
    mariaDB.insertProduct(producto).then(() => {
      console.log(`success: true, product: "inserted"`);
      mariaDB.SelectProducts().then((result) => {
        products = result;
        console.log(`success: true, products: "Selected"`);
        socketServer.sockets.emit("products", products);
      });
    });
  });

  socket.on("new_message", (mensaje) => {
    const sqlite = new sqLite(client, optionsSqLite);
    sqlite.insertMessage(mensaje).then(() => {
      console.log(`success: true, message: "inserted"`);
      sqlite.SelectMessages().then((result) => {
        messages = result;
        console.log(`success: true, messages: "Selected"`);
        socketServer.sockets.emit("messages", messages);
      });
    });
  });
});

httpServer.listen(port, () => {
  console.log("Estoy escuchando en el puerto 8080");
});

httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/", (req, res) => {
  const mariaDB = new MariaDB(optionsMariaDB);
  const sqlite = new sqLite(client, optionsSqLite);

  mariaDB.SelectProducts().then((result) => {
    products = result;
    console.log(`success: true, products: "Selected"`);
    socketServer.sockets.emit("products", products);
  });

  sqlite.SelectMessages().then((result) => {
    messages = result;
    console.log(`success: true, messages: "Selected"`);
    socketServer.sockets.emit("messages", messages);
  });
  res.render("main");
});
