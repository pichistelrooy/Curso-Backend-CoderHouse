const Knex = require('knex');

const options = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce/pepito.sqlite'
  }
}


class Contenedor {

  constructor(options, tabla) {
    this.knex = Knex(options);
    this.tabla = tabla;
  }

  listarTodos() {
    this.knex.from(this.table).select("*");
  }

  borrarPorId(id) {

  }

}