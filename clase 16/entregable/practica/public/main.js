const socket = io();

const enviarMensaje = () => {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const date = String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString());
  const mensaje = {
    email,
    message,
    date
  };
  socket.emit('new_message', mensaje);
  document.getElementById("email").value = '';
  document.getElementById("message").value = '';
  return false;
}

const cargarProducto = () => {
  const id = 0;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const producto = {
    id,
    title,
    price,
    thumbnail
  };
  socket.emit('new_product', producto);
  document.getElementById("title").value = '';
  document.getElementById("price").value = '';
  document.getElementById("thumbnail").value = '';
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  console.log(`${mensaje}`);
  const {
    email,
    message,
    date
  } = mensaje;
  return `
  <div>
    <strong style='color:blue'>${email}</strong>
    <p style='color:brown'>${message}</p>
    <i style='color:green'>${date}</i>
  </div>
  `;
}

const crearEtiquetasProductos = (producto) => {
  const {
    id,
    title,
    price,
    thumbnail
  } = producto;
  return `
  <tr>
    <td>${id}</td>
    <td>${title}</td>
    <td>$ ${price}</td>
    <td><img style="width: 50px; height:50px" src=${thumbnail} alt=""></td>
  </tr>
  <tr>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
  document.getElementById("messages").innerHTML = mensajesFinal;
}

const agregarProductos = (productos) => {
  const headtable = `<header class="p-3 bg-dark text-white text-center"><h1>Productos agregados</h1></header>
  <table class="table table-success table-striped-columns">
    <thead>
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Thumbnail</th>
    </thead>
    </tr>`
  const foottable = `</tbody>
  </table>`
  const products = productos.map(producto => crearEtiquetasProductos(producto)).join(" ");
  const productosFinal = headtable.concat(products, foottable);
  document.getElementById("products").innerHTML = productosFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('products', (products) => agregarProductos(products));