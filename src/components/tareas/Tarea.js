import React, { Fragment, useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "../proyectos/Proyecto";

const Tarea = ({ tarea }) => {
        //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas } = tareasContext;


  //extraer el proyecto 
const [proyectoActual] = proyecto;

  //FUncion para eliminar tarea ocn el btn eliminar
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id)
  };

  return (
    <Fragment>
      <li className="tarea sombra">
        <p>{tarea.nombre}</p>

        <div className="estado">
          {tarea.estado ? (
            <button type="button" className="completo">
              Completo
            </button>
          ) : (
            <button type="button" className="incompleto">
              incompleto
            </button>
          )}
        </div>

        <div className="acciones">
          <button type="button" className="btn btn-primario">
            Editar
          </button>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => tareaEliminar(tarea.id)}
          >
            Eliminar
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default Tarea;
