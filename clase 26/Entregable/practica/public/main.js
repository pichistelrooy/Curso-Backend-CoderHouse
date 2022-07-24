const socket = io();

const enviarMensaje = () => {
  const email = document.getElementById("email").value;
  const text = document.getElementById("message").value;
  const date = String(
    new Date().toDateString() + " " + new Date().toLocaleTimeString()
  );
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = 32;
  const alias = "Juancito";
  const avatar = "asdadasdasdasdasdas";
  const mensaje = {
    email,
    text,
    date,
    nombre,
    apellido,
    edad,
    alias,
    avatar,
  };
  socket.emit("new_message", mensaje);
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  return false;
};

const cargarProducto = () => {
  const id = 0;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const producto = {
    id,
    title,
    price,
    thumbnail,
  };
  socket.emit("new_product", producto);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  return false;
};

const crearEtiquetasProductos = (producto) => {
  const { id, title, price, thumbnail } = producto;
  return `
  <tr>
    <td>${id}</td>
    <td>${title}</td>
    <td>$ ${price}</td>
    <td><img style="width: 50px; height:50px" src=${thumbnail} alt=""></td>
  </tr>
  <tr>
  `;
};

const agregarMensajes = (mensajes) => {
  if (mensajes.length > 0) {
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

    const denormalizedMessages = normalizr.denormalize(
      mensajes[0].result,
      messagesSchema,
      mensajes[0].entities
    );
    const messages = denormalizedMessages.messages;
    const finalMessage = messages
      .map((message) => crearEtiquetasMensaje(message))
      .join(" ");
    document.getElementById("messages").innerHTML = finalMessage;

    //Compression
    const uncompressed = JSON.stringify(mensajes).length;
    const compressed = JSON.stringify(denormalizedMessages).length;
    const percCompression = Math.round((compressed * 100) / uncompressed);
    document.getElementById("compres").innerHTML =
      "Centro de Mensajes: compresion " + percCompression + "%";
  }
};

const crearEtiquetasMensaje = (mensaje) => {
  const { date, author, text } = mensaje;
  return `
  <div>
    <strong style='color:blue'>${author.email}(${author.nombre} ${author.apellido})</strong>
    <p style='color:brown'>${text}</p>
    <i style='color:green'>${date}</i>
  </div>
  `;
};

const agregarProductos = (productos) => {
  if (productos.length > 0) {
    const headtable = `<header class="p-3 bg-dark text-white text-center"><h1>Productos agregados</h1></header>
    <table class="table table-success table-striped-columns">
      <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Thumbnail</th>
      </thead>
      </tr>`;
    const foottable = `</tbody>
    </table>`;
    const products = productos
      .map((producto) => crearEtiquetasProductos(producto))
      .join(" ");
    const productosFinal = headtable.concat(products, foottable);
    document.getElementById("products").innerHTML = productosFinal;
  }
};

socket.on("messages", (normalizedMessages) =>
  agregarMensajes(normalizedMessages)
);
socket.on("products", (products) => agregarProductos(products));
