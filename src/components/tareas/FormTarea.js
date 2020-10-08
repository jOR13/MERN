import React, { useContext, useState, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
const FormTarea = () => {
  //extraer si algun proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const {
    errortarea,
    tareaseleccionada,
    agregarTarea,
    errorValida,
    obtenerTareas,
    editarTarea,
    limpiarTarea
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //state del formulario

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extraer nombre del proyecto
  const { nombre } = tarea;

  //Si no hay proyecto seleccionado
  if (!proyecto) {
    return null;
  }

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer valores del formularios

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      errorValida();
      return;
    }

    if (tareaseleccionada === null) {
      //agregar tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      //ya no es necesario, se queda falses desde la BD tarea.estado = false;
      agregarTarea(tarea);
    } else {
     //actualiza la tarea existente
      editarTarea(tarea);
      //Elimina tarea selccionada del state
      limpiarTarea();

    }

    //Obtener y filtrar las Tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //reinciar form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
