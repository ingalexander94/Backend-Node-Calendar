const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

const { PORT } = process.env;

// Configuraciones del servidor (Importa el orden)
app.use(cors());
app.use(express.static("public")); // Carpeta publica de la vista
app.use(express.json()); // Lectura y parseo de los datos enviados (POST,GET..)
app.use("/api/auth", require("./routes/auth")); // Rutas de la autenticación
app.use("/api/events", require("./routes/events")); // Rutas de los eventos

// Lanzar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
