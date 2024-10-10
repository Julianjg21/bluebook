/* import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: './configs.env' });

// Crear la conexión y usar .promise() para manejar promesas
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

try {
  // No es necesario `connect()` cuando se usa promesas en mysql2, puedes directamente hacer consultas
  console.log("Connection to the database established!!");

  // Aquí puedes realizar consultas usando await
  // Ejemplo de consulta:
  // const [rows] = await db.query("SELECT * FROM users");
  // console.log(rows);

} catch (err) {
  console.error("Error connecting to the database:", err);
}

export default db;


 */



import { createConnection } from "mysql2";
import dotenv from 'dotenv';
dotenv.config({ path: './configs.env' });

//create connection to the database
const db = await createConnection({
  host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connection to the database established!!");
});

export default db;