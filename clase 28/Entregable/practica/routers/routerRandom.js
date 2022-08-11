import { Router, json, urlencoded } from "express";
import fork from "child_process";
const routerRandom = Router();

routerRandom.use(json());
routerRandom.use(urlencoded({ extended: true }));

routerRandom.get("/:cant", (req, res) => {
  console.log(req.params.cant);
  const cantidad = parseInt(req.params.cant) || 1000;
  console.log(cantidad);
  const forkeado = fork.fork("./config/calculoFork.js");
  forkeado.send(cantidad);
  forkeado.on("message", (msg) => {
   res.send(msg) 
  })
});

export default routerRandom;