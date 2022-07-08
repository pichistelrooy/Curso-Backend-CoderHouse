import norm from "normalizr";
import print from "./print.js";
import empleados from "./empresa.js";

const posicionSchema = new norm.schema.Entity('posiciones');
const gerenteSchema = new norm.schema.Entity('gerentes');
const empleadoSchema = new norm.schema.Entity('empleados', {
  posicion: posicionSchema,
  gerente: gerenteSchema
});

const normalizado = norm.normalize(empleados, [ empleadoSchema ]);
// print(normalizado);
const desnormalizado = norm.denormalize(normalizado.result, [ empleadoSchema ], normalizado.entities);
print(desnormalizado);