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
import { MdDashboard, MdFingerprint, MdExitToApp, MdSchedule } from "react-icons/md";

function Sidebar({ activeModule, onNavigate, onLogout, userInfo }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const isActive = (moduleName) => activeModule === moduleName;

  const menuItems = [
    { name: "dashboard", icon: <MdDashboard />, label: "Dashboard", roles: ["Admin", "Supervisor", "Operator"] },
    { name: "empleados", icon: <FaUsers />, label: "Empleados", roles: ["Admin", "Supervisor", "Operator"] },
    { name: "usuarios", icon: <FaUserAlt />, label: "Usuarios", roles: ["Admin"] },
    { name: "sucursales", icon: <FaBuilding />, label: "Sucursales", roles: ["Admin", "Supervisor"] },
    { name: "regiones", icon: <FaMapMarkerAlt />, label: "Regiones", roles: ["Admin"] },
    { name: "oficinas", icon: <FaBuilding />, label: "Oficinas", roles: ["Admin", "Supervisor"] },
    { name: "reportes", icon: <FaFileAlt />, label: "Reportes", roles: ["Admin", "Supervisor", "Operator"] },
    { name: "schedules", icon: <MdSchedule />, label: "Schedules", roles: ["Admin", "Supervisor"] },
    { name: "attendance", icon: <MdFingerprint />, label: "Attendance", roles: ["Admin", "Supervisor", "Operator"] },
  ];

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
        {menuItems
          .filter((item) => item.roles.includes(userInfo.role))
          .map((item) => (
            <div
              key={item.name}
              className={`sidebar-item ${isActive(item.name) ? "active" : ""}`}
              onClick={() => onNavigate(item.name)}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}
      </div>

      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          <MdExitToApp className="logout-icon" />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="avatar">
            <FaUserAlt />
          </div>
          <div className="user-info">
            {!isCollapsed && <h3>{userInfo?.name || "Admin Usuario"}</h3>}
            <p>{userInfo?.role || "Administrador"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;