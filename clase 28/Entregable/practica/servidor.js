import express, { json, urlencoded } from "express";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { schema, normalize } from "normalizr";
import MariaDB from "./persistencia/MariaDB.js";
import mongoDB from "./persistencia/mongoDB.js";
//const print = require("./print");
import routerFaker from "./faker.js";
import routerRandom from "./routers/routerRandom.js";

//session mongo
import session from "express-session";
import cp from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "./passport.js";
import rutas from "./rutas.js";
import loginCheck from "./middlewares/loginCheck.js";
import { engine } from "express-handlebars";
import dotenv from "dotenv";
import minimist from "minimist";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const { MONGOURL, SECRET, HOSTMD, USERMD, PASSWORDMD, DATABASEMD } = process.env;

const resultado = minimist(process.argv, { alias: { 'p': 'port'}, default: { 'p': 8000 } });

console.log(resultado);

console.log({
  port: resultado["port"] || 'error',
  mongourl: MONGOURL || 'error',
  secret: SECRET || 'error',
  hostMD: HOSTMD || 'error',
  userMD: USERMD || 'error',
  passwordMD: PASSWORDMD || 'error',
  databaseMD: DATABASEMD || 'error'  
});

const app = express();
//const port = 8080;

app.use(express.static("./public"));
app.use(cp());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURL,
        //"mongodb+srv://pichistelrooy:marcos123@cluster0.alqfdri.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: SECRET,//"marcos",
    resave: true,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
    saveUninitialized: false,
  })
);

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./hbs_views");
app.use("/api/productos-test", routerFaker);
app.use("/api/randoms", routerRandom);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

let messagesList = [];
let products = [];

const optionsMariaDB = {
  client: "mysql",
  connection: {
    host: HOSTMD,//"127.0.0.1",
    user: USERMD,//"root",
    password: PASSWORDMD,//"",
    database: DATABASEMD,//"test",
  },
};

// creo bd MariaDB
async function crearBDMariaDB() {
  const mariaDB = new MariaDB(optionsMariaDB);
  await mariaDB.inicializarBD();
}

// llamo a mariaDB e inicializo tabla productos
crearBDMariaDB();

console.log(__dirname);

// creo bd sqLite
async function crearBDMongo() {
  const mongo = new mongoDB();
  await mongo.inicializarBD();
}

// llamo a sqLite e inicializo tabla messages
crearBDMongo();

httpServer.listen(resultado["port"], () => {
  console.log("Estoy escuchando en el puerto 8080");
});

httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

// LOGIN
app.get("/login", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/error_login",
    failureMessage: true,
  }),
  (req, res) => {
    req.session.name = req.body.username;
    res.redirect("/");
  }
);
app.get("/error_login", rutas.getErrorLogin);

// REGISTER
app.get("/register", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("register", {});
  }
});

app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/error_register",
    failureMessage: true,
  }),
  (req, res) => {
    req.session.name = req.body.username;
    res.render("login", {});
  }
);

app.get("/error_register", rutas.getErrorRegister);

// logout
app.get("/logout", loginCheck, (req, res) => {
  const user = req.session.name;
  req.session.destroy((err) => {
    res.render("logout", { user: user });
  });
});

// main
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

// faker
app.get("/productos-test", (req, res) => {
  res.render("faker", { layout: "faker.hbs" });
});

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

// INFO
app.get("/info", loginCheck, (req, res) => {
  const info = {
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.title,
    sistema: process.platform,
    memory: process.memoryUsage(),
    file: __dirname
  };

  console.log(
    "Actual workdir:" + process.cwd() + "\n",
    "Process ID:" + process.pid + "\n",
    "Node Version:" + process.version + "\n",
    "Process title:" + process.tittle + "\n",
    "Operative system:" + process.platform + "\n",
    "memory use:" + process.memoryUsage() + "\n",
    "Path: " + __dirname
  );
  res.send(info);
});

// normalizado
function normalizar(data) {
  const authorSchema = new schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );
  const messageSchema = new schema.Entity(
    "messages",
    { author: authorSchema },
    { idAttribute: "_id" }
  );
  const messagesSchema = new schema.Entity("total", {
    messages: [messageSchema],
  });

  const messagesToNorm = {
    id: 1,
    messages: data,
  };

  const normalizedMessages = normalize(messagesToNorm, messagesSchema);
  //print(normalizedMessages);
  return normalizedMessages;
}
