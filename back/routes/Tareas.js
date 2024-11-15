const express = require("express");
const router = express.Router();
const TareaController = require("../controller/Tarea"); // Cambié para referirse al controlador de tareas

// Ruta para agregar una nueva tarea
router.post("/tareas/agregar", TareaController.AgregarTarea);

// Ruta para editar una tarea existente
router.put("/tareas/editar/:id", TareaController.EditarTarea);

// Ruta para eliminar una tarea existente
router.delete("/tareas/eliminar/:id", TareaController.EliminarTarea);

// Ruta para listar todas las tareas
router.get("/tareas/listar", TareaController.ListarTodasTareas);

// Ruta para listar una tarea específica
router.get("/tareas/listarUno/:id", TareaController.ListarUnaTarea);

module.exports = router;
