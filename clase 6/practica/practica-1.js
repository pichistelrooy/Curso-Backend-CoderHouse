const http = require('http');

const server = http.createServer((req, res) => {
    const hours = new Date().getHours();
  
    if (hours >= 6 && hours < 13) res.end('Buenos días!');
    else if (hours >= 13 && hours < 19) res.end('Buenas tardes!');
    else res.end('Buenas noches!');
  });
  
  server.listen(8080, () => {
    console.log('Listening port 8080...');
  });