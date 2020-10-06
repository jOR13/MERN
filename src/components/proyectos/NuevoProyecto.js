import React, { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el state del fomulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //extraer nombre proyecto

  const { nombre } = proyecto;

  //lee contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar proyecto
    if (nombre === '') {
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);

    //reinciciar el form
    guardarProyecto({
      nombre: ''
    })
  };

  //cuando el user envia proyecto

  return (
    <Fragment>
      <button type="button btn-block btn-primario" className="btn" onClick={() => mostrarFormulario()}>
        Nuevo proyecto
      </button>

      {formulario ? (
        <form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre proyecto"
            name="nombre"
            onChange={onChangeProyecto}
            value={nombre}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null
      }

      {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
    </Fragment>
  );
};

export default NuevoProyecto;
