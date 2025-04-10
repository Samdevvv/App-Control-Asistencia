import React, { useState } from "react";
import "../estilos/Sidebar.css";
import {
  FaUserAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";

function Sidebar({ activeModule, onNavigate, onLogout, userInfo }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const isActive = (moduleName) => activeModule === moduleName;

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <MdFingerprint className="logo-icon" />
        {!isCollapsed && <span>AsistControl</span>}
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="sidebar-menu">
        <div className={`sidebar-item ${isActive("dashboard") ? "active" : ""}`} onClick={() => onNavigate("dashboard")}>
          <MdDashboard className="sidebar-icon" />
          {!isCollapsed && <span>Dashboard</span>}
        </div>
        <div className={`sidebar-item ${isActive("empleados") ? "active" : ""}`} onClick={() => onNavigate("empleados")}>
          <FaUsers className="sidebar-icon" />
          {!isCollapsed && <span>Empleados</span>}
        </div>
        <div className={`sidebar-item ${isActive("usuarios") ? "active" : ""}`} onClick={() => onNavigate("usuarios")}>
          <FaUserAlt className="sidebar-icon" />
          {!isCollapsed && <span>Usuarios</span>}
        </div>
        <div className={`sidebar-item ${isActive("sucursales") ? "active" : ""}`} onClick={() => onNavigate("sucursales")}>
          <FaBuilding className="sidebar-icon" />
          {!isCollapsed && <span>Sucursales</span>}
        </div>
        <div className={`sidebar-item ${isActive("regiones") ? "active" : ""}`} onClick={() => onNavigate("regiones")}>
          <FaMapMarkerAlt className="sidebar-icon" />
          {!isCollapsed && <span>Regiones</span>}
        </div>
        <div className={`sidebar-item ${isActive("oficinas") ? "active" : ""}`} onClick={() => onNavigate("oficinas")}>
          <FaBuilding className="sidebar-icon" />
          {!isCollapsed && <span>Oficinas</span>}
        </div>
        <div className={`sidebar-item ${isActive("reportes") ? "active" : ""}`} onClick={() => onNavigate("reportes")}>
          <FaFileAlt className="sidebar-icon" />
          {!isCollapsed && <span>Reportes</span>}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="avatar">
            <FaUserAlt />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <h3>{userInfo?.name || "Admin Usuario"}</h3>
              <p>{userInfo?.role || "Administrador"}</p>
            </div>
          )}
        </div>
        <div className="sidebar-item logout" onClick={onLogout}>
          <MdExitToApp className="sidebar-icon" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
