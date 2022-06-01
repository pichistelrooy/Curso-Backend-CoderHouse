const socket = io();
let listadoProductos = []; // ACA AGUS

const enviarMensaje = () => {
  const author = document.getElementById("author").value;
  const text = document.getElementById("text").value;
  const mensaje = { author, text };  
  socket.emit('new_message', mensaje);
  return false;
}

const cargarProducto = () => {
  const id = 0;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const producto = { id, title, price, thumbnail };  
  socket.emit('new_product', producto);
  return false;
}

const crearEtiquetasMensaje = (mensaje) => {
  const { author, text } = mensaje;
  return `
    <div>
      <strong>${author}</strong>
      <em>${text}</em>
    </div>
  `;
}

const crearEtiquetasProductos= (producto) => {  
  const { id, title, price, thumbnail } = producto;
  return `
  <tr>
  <td>${id}</td>  
  <td>${title}</td>
  <td>${price}</td>
  <td>${thumbnail}</td>
  </tr>
  `;
}

const agregarMensajes = (mensajes) => {
  const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");  
  document.getElementById("messages").innerHTML = mensajesFinal;
}

const agregarProductos = (productos) => {
  const headtable = `<table border="1">
  <caption></caption>
  <tbody>
        <tr>
  <th>Id</th>
  <th>Title</th>
  <th>Price</th>
  <th>Thumbnail</th>
    </tr>`
  const foottable = `</tbody>
  </table>`
  const products = productos.map(producto => crearEtiquetasProductos(producto)).join(" ");
  const productosFinal = headtable.concat(products,foottable);    
  document.getElementById("products").innerHTML = productosFinal;  
}

socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('products', (products) => agregarProductos(products));