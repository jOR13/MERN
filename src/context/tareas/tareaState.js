import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA } from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
      { id: 2, nombre: "Crear plataforma de pago", estado: false, proyectoId: 2 },
      { id: 3, nombre: "Elegir hosting", estado: true, proyectoId: 3 },
      { id: 4, nombre: "Crear base de datos", estado: true, proyectoId: 4 },
      { id: 5, nombre: "Elegir plataforma", estado: true, proyectoId: 4 },
      { id: 6, nombre: "Crear plataforma de pago", estado: false, proyectoId: 3 },
      { id: 7, nombre: "Elegir hosting", estado: true, proyectoId: 1 },
      { id: 8, nombre: "Crear base de datos", estado: true, proyectoId: 2 },
      { id: 9, nombre: "Elegir plataforma", estado: true, proyectoId: 3 },
      { id: 10, nombre: "Crear plataforma de pago", estado: false, proyectoId: 1 },
      { id: 11, nombre: "Elegir hosting", estado: true, proyectoId: 4 },
      { id: 12, nombre: "Crear base de datos", estado: true, proyectoId: 3 },
      { id: 13, nombre: "Elegir plataforma", estado: true, proyectoId: 2 },
      { id: 14, nombre: "Crear plataforma de pago", estado: false, proyectoId: 2 },
      { id: 15, nombre: "Elegir hosting", estado: true, proyectoId: 1 },
      { id: 16, nombre: "Crear base de datos", estado: true, proyectoId: 2 }
    ],
    tareasproyecto: null,
    errortarea: false
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones

  //Obtener las tareas de un proyecto
  const obtenerTareas = proyectoId => {
      dispatch({
          type: TAREAS_PROYECTO,
          payload: proyectoId
      })
  }

  //Agregar una tarea al proyecto seleccionado

  const agregarTarea= tarea => {
      dispatch({
          type: AGREGAR_TAREA, payload: tarea
      })
  }

  //Valida ymuestra error en caso de ser necesario
  const errorValida = () =>{
      dispatch({
          type: VALIDAR_TAREA
      })
  }

  //ELiminar tarea por ID

  const eliminarTarea = id => {
    dispatch({
        type: ELIMINAR_TAREA,
        payload: id
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto : state.tareasproyecto,
        errortarea: state.errortarea,
        obtenerTareas,
        agregarTarea,
        errorValida,
        eliminarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
