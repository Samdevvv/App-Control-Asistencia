import React from "react";
import "../estilos/RegistroUsuario.css";

function RegistroUsuario(){
  return (
    <div className="registro-container">
      
      <div className="sidebar">
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
      </div>

      <div className="registro-content">
        <div className="titulo">REGISTRO DE USUARIO</div>

        <div className="formulario">
          <input type="text" placeholder="Nombre de Usuario" />
          <select>
            <option value="">Empleado Asignado</option>
            <option value="empleado1">Empleado 1</option>
            <option value="empleado2">Empleado 2</option>
          </select>
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar Contraseña" />
        </div>

        <div className="botones">
          <button className="btn-confirmar">Confirmar Registro</button>
          <button className="btn-cancelar">Cancelar Registro</button>
        </div>

        <div className="tabla">Tabla</div>
      </div>

      <div className="sidebar right">
        <div className="user-profile">
          <div className="avatar"></div>
          <div>Usuario</div>
        </div>

        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
        <div className="sidebar-item">Lorem</div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
