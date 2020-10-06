import React, { useReducer } from "react";
import {v4 as uuid} from "uuid";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from "../../types";



const ProyectoState = (props) => {

    const proyectos = [
        { id: 1, nombre: "tienda virtual" },
        { id: 2, nombre: "intranet" },
        { id: 3, nombre: "ERP" },
        { id: 4, nombre: "MERN" },
      ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null
  };

  //ispatch para ejecutar las acciones
  const [state, dispach] = useReducer(proyectoReducer, initialState);

  //funciones para el crud

  const mostrarFormulario = () => {
    dispach({
      type: FORMULARIO_PROYECTO,
    });
  };

//obtener proyectos
const obtenerProyectos = () => {
    dispach({
        type: OBTENER_PROYECTOS,
        payload: proyectos
    })
}

//Agregar nuevo poryecto
const agregarProyecto = proyecto => {
    proyecto.id = uuid();
    //insertar el proyecto

    dispach({
        type: AGREGAR_PROYECTO,
        payload: proyecto
    })
}

//Valida el formulario
const mostrarError = () => {
    dispach({
        type: VALIDAR_FORMULARIO
    })
}


//Selecciona el proeycto que el usuario dio click 
const proyectoActual = proyectoId => {
    dispach({
        type: PROYECTO_ACTUAL,
        payload: proyectoId
    })
}

//Eliminar proyecto

const eliminarProyecto = proyectoId => {
    dispach({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
    })
}

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        formulario: state.formulario,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
