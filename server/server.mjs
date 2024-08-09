import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

//Get the name of the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Path to 'public' directory inside 'client'
const publicPath = path.join(__dirname, '../client/build');

//Configure the middleware to serve static filesy
app.use(express.static(publicPath));

//Start the server
app.listen(2128, (err) => {
  if (err) {
    console.error(`Error al iniciar el servidor: ${err}`);
  } else {
    console.log('Servidor creado en el puerto 2128');
  }
});
