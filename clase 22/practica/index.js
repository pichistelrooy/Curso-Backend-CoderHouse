import print from "./print.js";
import norm from "normalizr";
import posts from "./blog.js";

const esquemaComentario = new norm.schema.Entity('comentarios');
const esquemaAutor = new norm.schema.Entity('autores');
const esquemaCategoria = new norm.schema.Entity('categorias');

const esquemaPost = new norm.schema.Entity('posts', {
  autor: esquemaAutor,
  categoria: esquemaCategoria,
  comentarios: [ esquemaComentario ]
});

const normalizado = norm.normalize(posts, [ esquemaPost ]);
// print(normalizado);

const desnormalizado = norm.denormalize(normalizado.result, [ esquemaPost ], normalizado.entities);

print(desnormalizado);
