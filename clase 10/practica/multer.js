const express = require('express');
const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.originalname.endsWith('.png')) callback(null, 'images');
    else callback(null, 'otros')
  },
  filename: (req, file, callback) => {
    const nombreDeFile = file.originalname;
    callback(null, nombreDeFile);
  }
});

const uploaderMiddleware = multer({ storage: diskStorage });
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/subida', uploaderMiddleware.single('archivo'), (req, res) => {
  res.send('Subido OK!');
});

app.listen(8080, () => {
  console.log('Servidor escuchando!');
});