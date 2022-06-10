
fetch('/template.hbs')
  .then(response => response.text())
  .then(template => {
    const hbsTemplate = Handlebars.compile(template);

    const socket = io();

    socket.on('producto', (producto) => {
      const html = hbsTemplate(producto);
      document.getElementById("elementoRenderizar").innerHTML = html;
    });

  });