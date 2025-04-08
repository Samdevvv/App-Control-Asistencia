import React from "react";
import "../estilos/RegistroSucursal.css";

function RegistroSucursal(){
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
        <div className="titulo">REGISTRO DE LA SUCURSAL</div>

        <div className="formulario">
          <input type="text" placeholder="Nombre de la Sucursal" />
          <input type="email" placeholder="Correo Electronico" />
          <input type="text" placeholder="Direccion" />
          <input type="tel" placeholder="Telefono" />
          <select>
            <option value="">Region</option>
            <option value="region1">Region 1</option>
            <option value="region2">Region 2</option>
          </select>
          <select>
            <option value="">Oficina</option>
            <option value="oficina1">Oficina 1</option>
            <option value="oficina2">Oficina 2</option>
          </select>
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

export default RegistroSucursal;
