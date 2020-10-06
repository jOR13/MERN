import React, { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import Tarea from "./Tarea";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListadoTareas = () => {
  //extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  //Si no hay proyecto seleccionado
  if (!proyecto) {
    return <h2>Selecciona algun proyecto</h2>;
  }

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Eliminar proyecto

  const OnclickEliminarProyecto = () => {
    eliminarProyecto(proyectoActual.id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre} </h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition 
                key={tarea.id} 
                timeout={200} 
                className="tarea"
              >
                <Tarea 
                  tarea={tarea} 
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={OnclickEliminarProyecto}
      >
        Eliminar proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
