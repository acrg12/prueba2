const express = require("express"); // Solo una vez al inicio
const cors = require("cors");

// Importa las rutas
const tareasRoutes = require("./routes/Tareas"); // Ajusta la ruta según tu estructura

const app = express();
require("./models/conexion"); // Importa tu configuración de base de datos

// Configuración del puerto
const puerto = 3600;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registrar las rutas
app.use("/api", tareasRoutes);

app.listen(puerto, () => {
  console.log(`Aplicación ejecutándose en: http://localhost:${puerto}`);
});
