const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const normalizr = require("normalizr");

const MariaDB = require("./persistencia/MariaDB.js");
const mongoDB = require("./persistencia/mongoDB.js");
const print = require("./print");
const routerFaker = require("./faker.js");

//session mongo
const session = require("express-session");
const cp = require("cookie-parser");
const MongoStore = require("connect-mongo");

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

const loginCheck = require("./middlewares/loginCheck");
app.use(cp());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://pichistelrooy:marcos123@cluster0.alqfdri.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "marcos",
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
    saveUninitialized: false,
  })
);

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
    mongo.insertMessage(mensaje).then(() => {
      mongo.SelectMessages().then((result) => {
        messagesList = [];
        messagesList.push(normalizar(result));
        socketServer.sockets.emit("messages", messagesList);
      });
    });
  });
});

httpServer.listen(port, () => {
  console.log("Estoy escuchando en el puerto 8080");
});

httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

// Router
app.get("/login", (req, res) => {
  if (req.session.name) {
    res.redirect("/");    
  } else {
    res.render("login", {});
  }
});

app.post("/login", async (req, res) => {
  req.session.name = req.body.nemo;
  res.redirect("/");
});

app.get("/logout", loginCheck, (req, res) => {
  const user = req.session.name;
  req.session.destroy((err) => {
    console.log(err);
    res.render("logout", { user: user });
  });
});

app.get("/", loginCheck, async (req, res) => {
  const mariaDB = new MariaDB(optionsMariaDB);
  const mongo = new mongoDB();

  mariaDB.SelectProducts().then((result) => {
    products = result;
    socketServer.sockets.emit("products", products);
  });

  mongo.SelectMessages().then((result) => {
    messagesList.push(normalizar(result));
    socketServer.sockets.emit("messages", messagesList);
  });

  res.render("main", { user: req.session.name });
});

app.get("/productos-test", (req, res) => {
  res.render("faker", { layout: "faker.hbs" });
});

function normalizar(data) {
  const authorSchema = new normalizr.schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );
  const messageSchema = new normalizr.schema.Entity(
    "messages",
    { author: authorSchema },
    { idAttribute: "_id" }
  );
  const messagesSchema = new normalizr.schema.Entity("total", {
    messages: [messageSchema],
  });

  const messagesToNorm = {
    id: 1,
    messages: data,
  };

  const normalizedMessages = normalizr.normalize(
    messagesToNorm,
    messagesSchema
  );  
  print(normalizedMessages);
  return normalizedMessages;
}
