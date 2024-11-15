const { Tarea } = require("../models/conexion");

const AgregarTarea = async (req, res) => {
  try {
    await Tarea.create(req.body); // Crear nueva tarea
    res.status(200).json({ id: 200, mensaje: "Tarea agregada correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al agregar la tarea", error: error.message });
  }
};

const EditarTarea = async (req, res) => {
  try {
    await Tarea.update(req.body, { where: { idtarea: req.params.id } }); // Editar tarea existente
    res.status(200).json({ mensaje: "Tarea editada correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al editar la tarea", error: error.message });
  }
};

const EliminarTarea = async (req, res) => {
  try {
    await Tarea.destroy({ where: { idtarea: req.params.id } }); // Eliminar tarea
    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al eliminar la tarea", error: error.message });
  }
};

const ListarTodasTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll(); // Listar todas las tareas
    res.status(200).json(tareas);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al listar las tareas", error: error.message });
  }
};

const ListarUnaTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ where: { idtarea: req.params.id } }); // Buscar una tarea específica
    res.status(200).json(tarea);
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "Error al buscar la tarea", error: error.message });
  }
};

module.exports = {
  AgregarTarea,
  EditarTarea,
  EliminarTarea,
  ListarTodasTareas,
  ListarUnaTarea,
};
