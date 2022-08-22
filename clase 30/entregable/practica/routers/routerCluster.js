import { Router, json, urlencoded } from "express";
const routerCluster = Router();

import os from "os";
const cpus = os.cpus().length;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

routerCluster.use(json());
routerCluster.use(urlencoded({ extended: true }));


routerCluster.get("/cluster", (req, res) => {
  console.log("router cluster get");
  res.send("/cluster invocated");
});

routerCluster.get("/randoms", (req, res) => {
  res.send("/randoms invocated");
});

routerCluster.get("/info", (req, res) => {
  const info = {
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.title,
    sistema: process.platform,
    memory: process.memoryUsage(),
    file: __dirname,
    cantidadProcesadores: cpus
  };
  console.log(
    "Actual workdir:" + process.cwd() + "\n",
    "Process ID:" + process.pid + "\n",
    "Node Version:" + process.version + "\n",
    "Process title:" + process.tittle + "\n",
    "Operative system:" + process.platform + "\n",
    "memory use:" + process.memoryUsage() + "\n",
    "Path: " + __dirname,
    "Cantidad de Procesadores:" + cpus
  );
  res.send(info);
});

export default routerCluster;