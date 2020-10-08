import React, { useReducer } from "react";
//import {v4 as uuid} from "uuid";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  // const proyectos = [
  //     { id: 1, nombre: "tienda virtual" },
  //     { id: 2, nombre: "intranet" },
  //     { id: 3, nombre: "ERP" },
  //     { id: 4, nombre: "MERN" },
  //   ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
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
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("api/proyectos");
      dispach({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error al eliminar',
        categoria: 'alerta-error'
      }
      dispach({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  //Agregar nuevo poryecto
  const agregarProyecto = async (proyecto) => {
    // proyecto.id = uuid();
    //insertar el proyecto

    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      dispach({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error al eliminar',
        categoria: 'alerta-error'
      }
      dispach({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  };

  //Valida el formulario
  const mostrarError = () => {
    dispach({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Selecciona el proeycto que el usuario dio click
  const proyectoActual = (proyectoId) => {
    dispach({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //Eliminar proyecto

  const eliminarProyecto = async (proyectoId) => {

    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispach({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      });
      
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error al eliminar',
        categoria: 'alerta-error'
      }
      dispach({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }

  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        formulario: state.formulario,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
