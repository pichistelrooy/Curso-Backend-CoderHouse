import print from "./print.js"
import norm from "normalizr";
import holding from "./holding.js";

const jefeSchema = new norm.schema.Entity('jefes');
const areaSchema = new norm.schema.Entity('areas', {
  jefe: jefeSchema
});
const clusterSchema = new norm.schema.Entity('antiguedades');
const empleadoSchema = new norm.schema.Entity('empleados', {
  cluster_antiguedad: clusterSchema,
  area: areaSchema
});
const holdingSchema = new norm.schema.Entity('holdings', {
  empleados: [ empleadoSchema ]
});

const normalizado = norm.normalize(holding, holdingSchema);
const denormalizado = norm.denormalize(normalizado.result, holdingSchema, normalizado.entities);

print(denormalizado);