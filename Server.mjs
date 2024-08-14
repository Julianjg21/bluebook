import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import cors from "cors";

const PORT =  process.env.PORT ||  3080;

const app = express();
dotenv.config();
app.use(cors()); 
//Get the name of the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Path to 'public' directory inside 'client'
const publicPath = path.join(__dirname, 'server/client/build');
//Configure the middleware to serve static filesy
app.use(express.static(publicPath));

//Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor creado en el puerto ${PORT}`);
  }
});
