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
const passport = require("./passport");
const rutas = require("./rutas");
const loginCheck = require("./middlewares/loginCheck");

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

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/login", rutas.getlogin);
app.post("/login", passport.authenticate('auth', {failureRedirect:'/error_login', failureMessage: true}), (req, res) => {
  res.redirect('/');
});
  
  //rutas.postlogin)
app.get("/error_login", rutas.getErrorLogin)

// login
/*pp.get("/login", (req, res) => {
  console.log('hola');
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});*/

/*app.post("/login", async (req, res) => {
  console.log('email: ' + req.body.email);
  console.log('password: ' + req.body.pass);  
  //req.session.name = req.body.nemo;
  res.redirect("/");
});*/


// register
app.get("/register", (req, res) => {
  res.render("register", {});
});

app.post("/register", async (req, res) => {
  console.log('email: ' + req.body.email);
  console.log('password: ' + req.body.pass);  
  //req.session.name = req.body.nemo;
  res.redirect("/login");
});

// logout
app.get("/logout", loginCheck, (req, res) => {
  const user = req.session.name;
  req.session.destroy((err) => {
    console.log(err);
    res.render("logout", { user: user });
  });
});

// main
app.get("/", loginCheck, async (req, res) => {
  console.log('redirecciono');
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

// faker
app.get("/productos-test", (req, res) => {
  res.render("faker", { layout: "faker.hbs" });
});

// normalizado
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
