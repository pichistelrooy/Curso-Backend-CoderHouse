const Knex = require('knex').default;

const options = {
  filename: './mydb.sqlite'
};

const knex = Knex({
  client: 'sqlite3',
  connection: options
});

const ejecutar = async () => {
  await knex.schema.dropTableIfExists("articulos");
  await knex.schema.createTable("articulos", (table) => {
    table.increments("id").primary().notNullable();
    table.string("nombre", 15).notNullable();
    table.string("codigo", 10).notNullable();
    table.float("precio");
    table.integer("stock");
  });
  await knex("articulos").insert([
    {nombre: "Producto 1", codigo: "PROD1", precio: 10, stock: 5},
    {nombre: "Producto 2", codigo: "PROD3", precio: 10, stock: 5},
    {nombre: "Producto 2", codigo: "PROD3", precio: 10, stock: 5}
  ]);
  console.log(await knex.from("articulos").select("*"));
  await knex("articulos").where({ "id": 3 }).del();
  await knex("articulos").where({ "id": 2 }).update({ "stock": 0});
  console.log(await knex.from("articulos").select("*"));
}

ejecutar();