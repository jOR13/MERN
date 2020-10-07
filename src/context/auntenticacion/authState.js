import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      //console.log(respuesta);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      //Obtener el user
      usuarioAuntenticado();
    } catch (error) {
      //console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAuntenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //todo: FUNCION PARA ENVIAR EL TOKEN POR HEADERS
      tokenAuth(token);
      try {
        const respuesta = await clienteAxios.get("api/auth");
        //console.log(respuesta);
        dispatch({
          type: OBTENER_USUARIO,
          payload: respuesta.data.usuario,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOGIN_ERROR,
        });
      }
    }
  };

  //CUando el user inicia sesion

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //Obtener el user
      usuarioAuntenticado();
      //console.log(respuesta);
    } catch (error) {
      //console.log(error.response.data.msg)
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
