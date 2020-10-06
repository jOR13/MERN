import React, { useContext, useState } from "react";

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
    agregarTarea,
    errorValida,
    obtenerTareas,
  } = tareasContext;

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

    //agregar tarea al state de tareas
    tarea.proyectoId = proyectoActual.id;
    tarea.estado = false;
    agregarTarea(tarea);

    //Obtener y filtrar las Tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

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
            value="Agregar Tarea"
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
