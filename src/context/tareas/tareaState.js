import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
//import { v4 as uuid } from "uuid";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  EDITAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    // tareas: [
    //   { id: 1, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
    //   {
    //     id: 2,
    //     nombre: "Crear plataforma de pago",
    //     estado: false,
    //     proyectoId: 2,
    //   },
    //   { id: 3, nombre: "Elegir hosting", estado: true, proyectoId: 3 },
    //   { id: 4, nombre: "Crear base de datos", estado: true, proyectoId: 4 },
    //   { id: 5, nombre: "Elegir plataforma", estado: true, proyectoId: 4 },
    //   {
    //     id: 6,
    //     nombre: "Crear plataforma de pago",
    //     estado: false,
    //     proyectoId: 3,
    //   },
    //   { id: 7, nombre: "Elegir hosting", estado: true, proyectoId: 1 },
    //   { id: 8, nombre: "Crear base de datos", estado: true, proyectoId: 2 },
    //   { id: 9, nombre: "Elegir plataforma", estado: true, proyectoId: 3 },
    //   {
    //     id: 10,
    //     nombre: "Crear plataforma de pago",
    //     estado: false,
    //     proyectoId: 1,
    //   },
    //   { id: 11, nombre: "Elegir hosting", estado: true, proyectoId: 4 },
    //   { id: 12, nombre: "Crear base de datos", estado: true, proyectoId: 3 },
    //   { id: 13, nombre: "Elegir plataforma", estado: true, proyectoId: 2 },
    //   {
    //     id: 14,
    //     nombre: "Crear plataforma de pago",
    //     estado: false,
    //     proyectoId: 2,
    //   },
    //   { id: 15, nombre: "Elegir hosting", estado: true, proyectoId: 1 },
    //   { id: 16, nombre: "Crear base de datos", estado: true, proyectoId: 2 },
    // ],
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones

  // Obtener las tareas de un proyecto
  const obtenerTareas = async (proyecto) => {
    //console.log(proyecto);

    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      //console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    try {
      await clienteAxios.post("api/tareas", tarea);

      //tarea.id = uuid();
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida ymuestra error en caso de ser necesario
  const errorValida = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //ELiminar tarea por ID

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`api/tareas/${id}`, { params: { proyecto } });

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Cambia el estado de cada tarea

  //FUncion para editar la tarea
  const editarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: EDITAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Funcion  para extraer una tarea para editar
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Eliminar la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        // tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        errorValida,
        eliminarTarea,
        guardarTareaActual,
        editarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
