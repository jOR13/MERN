import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auntenticacion/authContext";

const NuevaCuenta = (props) => {
  //Extraer los valores del context

  const alertaContext = useContext(AlertaContext);

  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);

  const { registrarUsuario, mensaje, autenticado } = authContext;

  //En caso de que el usuario se registre doble
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, props.history]);

  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  //extraer de usuario

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //password minimo 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "Su contraseña debe contener al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //revisar 2 passwords iguales
    if (password !== confirmar) {
      mostrarAlerta(
        "Las contraseñas ingresadas son diferentes",
        "alerta-error"
      );
      return;
    }

    //Pasarlo a la accion
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu correo nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo electronico"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Comprobar contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="repite tu contraseña"
              onChange={onChange}
              value={confirmar}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Ya tengo una cuenta
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
