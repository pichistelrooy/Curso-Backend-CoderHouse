const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const normalizr = require("normalizr");

const MariaDB = require("./persistencia/MariaDB.js");
//const sqLite = require("./persistencia/sqLite.js");
const mongoDB = require("./persistencia/mongoDB.js");

const print = require("./print");

const routerFaker = require("./faker.js");

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

app.use("/api/productos-test", routerFaker);

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

let messagesList = [];
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

/*const optionsSqLite = {
  filename: "./ecommerce/mydb.sqlite",
};
const client = "sqlite3";

// creo bd sqLite
async function crearBDsqLite() {
  const sqlite = new sqLite(client, optionsSqLite);
  await sqlite.crearBD();
}*/

// llamo a sqLite e inicializo tabla messages
//crearBDsqLite();

// creo bd MariaDB
async function crearBDMariaDB() {
  const mariaDB = new MariaDB(optionsMariaDB);
  await mariaDB.inicializarBD();
}

// llamo a mariaDB e inicializo tabla productos
crearBDMariaDB();

// creo bd sqLite
async function crearBDMongo() {
  const mongo = new mongoDB();
  await mongo.inicializarBD();
}

// llamo a sqLite e inicializo tabla messages
crearBDMongo();

socketServer.on("connection", (socket) => {
  socket.emit("messages", messagesList);
  socket.emit("products", products);

  socket.on("new_product", (producto) => {
    const mariaDB = new MariaDB(optionsMariaDB);
    mariaDB.insertProduct(producto).then(() => {
      mariaDB.SelectProducts().then((result) => {
        products = result;
        socketServer.sockets.emit("products", products);
      });
    });
  });

  socket.on("new_message", (mensaje) => {
    const mongo = new mongoDB();
    mongo.insertMessage(mensaje).then(()=> {
      mongo.SelectMessages().then((result) => { 
        messagesList = [];
        messagesList.push(normalizar(result)); 
        socketServer.sockets.emit("messages", messagesList);
      });
    });
    /*const sqlite = new sqLite(client, optionsSqLite);
    sqlite.insertMessage(mensaje).then(() => {
      sqlite.SelectMessages().then((result) => {
        messages = result;
        socketServer.sockets.emit("messages", messages);
      });
    });*/
  });
});

httpServer.listen(port, () => {
  console.log("Estoy escuchando en el puerto 8080");
});

httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/", async (req, res) => {
  const mariaDB = new MariaDB(optionsMariaDB);
  //const sqlite = new sqLite(client, optionsSqLite);
  const mongo = new mongoDB();

  mariaDB.SelectProducts().then((result) => {
    products = result;
    socketServer.sockets.emit("products", products);
  });

  mongo.SelectMessages().then((result) => {     
    messagesList.push(normalizar(result));
    socketServer.sockets.emit("messages", messagesList);
  });

  /*sqlite.SelectMessages().then((result) => {
    messages = result;    
    console.log(messages);
    socketServer.sockets.emit("messages", messages);
  });*/
  res.render("main");
});

app.get("/productos-test", (req, res) => {
  res.render("faker", { layout: "faker.hbs" });
});

function normalizar(data) {
  const authorSchema = new normalizr.schema.Entity('authors', {}, {idAttribute: 'email'});
  const messageSchema = new normalizr.schema.Entity('messages', {author: authorSchema}, {idAttribute: '_id'});
  const messagesSchema = new normalizr.schema.Entity('total', {
    messages: [ messageSchema ]
  });

  const messagesToNorm = {
    id: 1,
    messages : data
  };

  const normalizedMessages = normalizr.normalize(messagesToNorm, messagesSchema);
  console.log('se viene el normalizado');    
  print(normalizedMessages);
  return normalizedMessages;
}