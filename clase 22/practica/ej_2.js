import print from "./print.js";
import norm from "normalizr";
import articulos from "./articulos.js";

const commenterSchema = new norm.schema.Entity('commenters');
const commentSchema = new norm.schema.Entity('comments', {
  commenter: commenterSchema
});
const authorSchema = new norm.schema.Entity('authors');
const postSchema = new norm.schema.Entity('posts', {
  author: authorSchema,
  comments: [ commentSchema ]
});
const articleSchema = new norm.schema.Entity('articles', {
  posts: [ postSchema ]
});

const normalizado = norm.normalize(articulos, articleSchema);
const largoNormalizado = JSON.stringify(normalizado).length;
const largoSinNormalizar = JSON.stringify(articulos).length;

console.log('Largo normalizado: ', largoNormalizado);
console.log('Largo sin normalizar: ', largoSinNormalizar);