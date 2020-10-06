import React, { Fragment, useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
        //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;


  //extraer el proyecto 
const [proyectoActual] = proyecto;

  //FUncion para eliminar tarea ocn el btn eliminar
  const tareaEliminar = id => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id)
  };

  //FUncion que modifica el estado de las tareas

  const cambiarEstado = tarea => {
      if(tarea.estado){
        tarea.estado = false;
      }else{
        tarea.estado = true;
      }
      cambiarEstadoTarea(tarea);
  }


  //Agrega una tarea actual para editarla
  const  seleccionarTarea = tarea =>  {
    guardarTareaActual(tarea);
  }

  return (
    <Fragment>
      <li className="tarea sombra">
        <p>{tarea.nombre}</p>

        <div className="estado">
          {tarea.estado ? (
            <button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>
              Completo
            </button>
          ) : (
            <button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>
              incompleto
            </button>
          )}
        </div>

        <div className="acciones">
          <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>
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
