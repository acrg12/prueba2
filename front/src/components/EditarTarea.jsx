import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import HelperForm from "../helper/HelperForm"; // Importamos el hook HelperForm para manejar los datos del formulario
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; // Librería para mostrar alertas de manera más estilizada
const Swal = withReactContent(Swal2); // Usamos Swal con ReactContent para integrar React

const EditarTarea = ({
  show, // Propiedad que indica si el modal debe estar visible o no
  handleClose, // Función para cerrar el modal
  id, // ID de la tarea a editar
  titulo, // Titulo actual de la tarea
  descripcion, // Descripción actual de la tarea
  setEditar, // Función para manejar el estado de la tarea en edición
  listarTarea, // Función para actualizar la lista de tareas después de editar
}) => {
  // Usamos HelperForm para manejar los valores de los campos del formulario
  const { form, cambiar } = HelperForm({
    titulo, // Asignamos el título actual de la tarea como valor inicial
    descripcion, // Asignamos la descripción actual de la tarea como valor inicial
  });

  // Función que se llama cuando se envía el formulario para editar la tarea
  const Editar = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario
    let formulario = form; // Obtenemos los datos del formulario

    try {
      // Realizamos la solicitud para editar la tarea con el método PUT
      const request = await fetch(`http://localhost:3600/tarea/editar/${id}`, {
        method: "PUT",
        body: JSON.stringify(formulario), // Enviamos los datos del formulario como JSON
        headers: {
          "Content-Type": "application/json", // Indicamos que el cuerpo de la solicitud es JSON
        },
      });

      const data = await request.json(); // Parseamos la respuesta a JSON
      if (data.id === 200) {
        // Si la respuesta tiene id 200, la tarea fue editada con éxito
        let mensaje = data.mensaje; // Extraemos el mensaje de la respuesta
        // Mostramos una alerta de éxito usando SweetAlert2
        Swal.fire({
          title: <strong> {"Editado"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "success",
        });
        setEditar(0); // Resetemos el estado de la tarea editada
        listarTarea(); // Actualizamos la lista de tareas para reflejar los cambios
      } else {
        // Si hubo un error al editar
        let mensaje = data.mensaje; // Extraemos el mensaje de error
        // Mostramos una alerta de error usando SweetAlert2
        Swal.fire({
          title: <strong> {"Error"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      // Si ocurre un error con la solicitud, mostramos una alerta
      Swal.fire({
        title: <strong> {"Error"}</strong>,
        html: <i>Hubo un problema al editar la tarea.</i>,
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* Modal para editar la tarea */}
      <Modal
        show={show} // Controla la visibilidad del modal
        onHide={handleClose} // Función que se ejecuta al cerrar el modal
        aria-labelledby="contained-modal-title-vcenter"
        centered // Centra el modal en la pantalla
      >
        <Modal.Header closeButton id="gradient">
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Tarea
          </Modal.Title>
        </Modal.Header>
        {/* Formulario para editar la tarea */}
        <form onSubmit={Editar}>
          {" "}
          {/* Al enviar el formulario, llamamos la función Editar */}
          <Modal.Body>
            {/* Campo de entrada para el título de la tarea */}
            <div className="mb-2">
              <label className="form-label">Editar Titulo</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="titulo"
                name="titulo"
                onChange={cambiar} // Cada vez que cambia el valor del campo, actualiza el estado del formulario
                defaultValue={titulo} // Establece el valor inicial del campo con el título actual
              />
            </div>
            {/* Campo de entrada para la descripción de la tarea */}
            <div className="mb-2">
              <label className="form-label">Editar Descripción</label>
              <input
                type="text"
                className="form-control border-secondary"
                id="descripcion"
                name="descripcion"
                onChange={cambiar} // Cada vez que cambia el valor del campo, actualiza el estado del formulario
                defaultValue={descripcion} // Establece el valor inicial del campo con la descripción actual
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Botón para enviar el formulario y editar la tarea */}
            <button type="submit" className="btn-gradient">
              <i className="fas fa-edit"></i> Editar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditarTarea;
