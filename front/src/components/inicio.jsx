import React, { useState, useEffect } from "react"; // Importación de React y hooks
import Modal from "react-bootstrap/Modal"; // Importación de Modal de React-Bootstrap
import HelperForm from "../helper/HelperForm"; // Importación del hook personalizado HelperForm
import Swal2 from "sweetalert2"; // Importación de la librería SweetAlert2
import withReactContent from "sweetalert2-react-content"; // Integración de SweetAlert2 con React
// import EditarTarea from "./EditarTarea"; // Se comenta la importación del componente EditarTarea
const Swal = withReactContent(Swal2); // Integración de SweetAlert con React

const Inicio = (props) => {
  const [datos, SetDatos] = useState([]); // Estado para almacenar las tareas
  const { form, cambiar } = HelperForm({}); // Usamos HelperForm para manejar el formulario
  const [Editar, setEditar] = useState(null); // Estado para gestionar la tarea que se va a editar

  // Función para agregar una nueva tarea
  const AgregarTarea = async (e) => {
    const titulo = document.querySelector("#titulo"); // Selección del campo de título
    const descripcion = document.querySelector("#descripcion"); // Selección del campo de descripción
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario

    let formulario = form; // Obtenemos los datos del formulario

    try {
      // Se hace una solicitud POST para agregar la tarea
      const request = await fetch("http://localhost:3600/api/tareas/agregar", {
        method: "POST",
        body: JSON.stringify(formulario), // Enviamos los datos como JSON
        headers: {
          "Content-Type": "application/json", // Definimos el tipo de contenido como JSON
        },
      });

      const data = await request.json(); // Convertimos la respuesta en JSON

      if (data.id === 200) {
        // Si la respuesta tiene id 200, significa que la tarea fue agregada correctamente
        let mensaje = data.mensaje; // Extraemos el mensaje de la respuesta
        // Mostramos una alerta de éxito con SweetAlert2
        Swal.fire({
          title: <strong>{"Agregado"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "success",
        });

        // Refrescar la lista de tareas
        ListarTareas();

        // Limpiar los campos de entrada
        titulo.value = "";
        descripcion.value = "";
      } else {
        // Si hay un error
        let mensaje = data.mensaje; // Extraemos el mensaje de error
        // Mostramos una alerta de error
        Swal.fire({
          title: <strong>{"Error"}</strong>,
          html: <i>{mensaje}</i>,
          icon: "error",
        });
      }
    } catch (error) {
      // Si ocurre un error durante la solicitud
      Swal.fire({
        title: <strong>{"Error"}</strong>,
        html: <i>Hubo un problema con la solicitud.</i>,
        icon: "error",
      });
    }
  };

  // Función para listar todas las tareas
  const ListarTareas = async () => {
    const request = await fetch("http://localhost:3600/api/tareas/listar", {
      method: "GET", // Realizamos una solicitud GET para obtener todas las tareas
    });

    try {
      const data = await request.json(); // Convertimos la respuesta en JSON
      console.log(data); // Imprimimos la respuesta en la consola para verificar
      if (data.mensaje) {
        // Si hay un mensaje en la respuesta, actualizamos el estado de las tareas
        SetDatos(data.mensaje); // Actualizamos el estado con las tareas obtenidas
      }
    } catch (error) {
      // Si ocurre un error al obtener las tareas
      console.error("Error al listar tareas:", error); // Mostramos el error en la consola
    }
  };

  // useEffect para cargar las tareas al cargar el componente
  useEffect(() => {
    ListarTareas(); // Cargamos las tareas cuando se monta el componente
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Funciones para manejar los modales
  const [show2, setShow2] = useState(false); // Estado para controlar la visibilidad del modal de agregar tarea
  const handleClose2 = () => setShow2(false); // Función para cerrar el modal de agregar tarea
  const handleShow2 = () => setShow2(true); // Función para abrir el modal de agregar tarea

  const [show, setShow] = useState(false); // Estado para controlar la visibilidad del modal de editar tarea
  const handleClose = () => setShow(false); // Función para cerrar el modal de editar tarea
  const handleShow = () => setShow(true); // Función para abrir el modal de editar tarea

  return (
    <>
      {/* Modal para agregar tarea */}
      <Modal
        show={show2} // Muestra el modal si show2 es true
        onHide={handleClose2} // Cierra el modal cuando se llama handleClose2
        aria-labelledby="contained-modal-title-vcenter"
        centered // Centra el modal en la pantalla
      >
        <Modal.Header closeButton id="gradient">
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar Tarea
          </Modal.Title>
        </Modal.Header>
        {/* Formulario para agregar tarea */}
        <form onSubmit={AgregarTarea}>
          {" "}
          {/* Al enviar el formulario, ejecutamos la función AgregarTarea */}
          <Modal.Body>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-secondary"
                id="titulo" // Campo para el título de la tarea
                name="titulo"
                placeholder="Titulo de la tarea"
                onChange={cambiar} // Al cambiar el valor del campo, se actualiza el estado del formulario
              />
              <label>Titulo de la tarea</label>{" "}
              {/* Etiqueta para el campo de título */}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control border-secondary"
                id="descripcion" // Campo para la descripción de la tarea
                name="descripcion"
                placeholder="Descripción"
                onChange={cambiar} // Al cambiar el valor del campo, se actualiza el estado del formulario
              />
              <label>Descripción</label>{" "}
              {/* Etiqueta para el campo de descripción */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* Botón para enviar el formulario */}
            <button className=" btn-gradient" type="submit">
              <i className="fa-solid fa-floppy-disk"></i> Agregar
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Navbar con enlaces */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <a className="navbar-brand" href="#!">
            Tareitas
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#!">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="container px-4 px-lg-5">
        <div className="col-12 text-end mt-4">
          {/* Botón para abrir el modal de agregar tarea */}
          <button onClick={handleShow2} className=" btn-gradient">
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Agregar
            Tarea
          </button>
        </div>
        <div className="row gx-4 gx-lg-5 align-items-center my-5 mt-5">
          <div className="col-lg-7">
            <h4>Tareas por completar</h4>
            <table className="table border border-black table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Descripción</th>
                  <th>Editar</th>
                  <th>Estado</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {datos.length > 0 ? (
                  datos.map((tareas) => (
                    <tr key={tareas.idtarea}>
                      <td>{tareas.idtarea}</td>
                      <td>{tareas.titulo}</td>
                      <td>{tareas.descrip}</td>
                      <td>
                        <a
                          className="btn btn-app btn-gradient2"
                          onClick={() => {
                            setEditar(tareas.idtarea); // Establece la tarea a editar
                            handleShow(); // Muestra el modal de edición
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>
                      </td>
                      <td>{tareas.estado ? "Completado" : "Incompleto"}</td>
                      <td>
                        <a
                          className="btn btn-app btn-gradient"
                          onClick={() => {
                            // Implementar la función Eliminar
                          }}
                        >
                          <i
                            className="bi bi-trash3"
                            style={{ color: "white" }}
                          ></i>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No hay tareas disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Tareas Completadas</h1>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2023
          </p>
        </div>
      </footer>
    </>
  );
};

export default Inicio;
