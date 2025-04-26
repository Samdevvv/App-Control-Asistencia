import React, { useState } from "react";
import "./App.css";
import { ModalProvider } from "./componentes/ModalManager";
import Sidebar from "./componentes/Sidebar";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import ModuloUsuarios from "./componentes/ModuloUsuarios";
import ModuloEmpleados from "./componentes/Empleados";
import ModuloSucursales from "./componentes/Sucursales";
import ModuloRegiones from "./componentes/Regiones";
import ModuloOficinas from "./componentes/Oficinas";
import ModuloReportes from "./componentes/Reportes";
import ScheduleManagement from "./componentes/ScheduleManagement";
import AttendanceLog from "./componentes/AttendanceLog";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [moduleParams, setModuleParams] = useState({});

  const tempCredentials = {
    username: "admin",
    password: "admin123",
  };

  const userInfo = {
    name: "Daniel",
    role: "Admin", // Can be "Admin", "Supervisor", or "Operator"
    region: "All", // Set to specific region for Supervisors (e.g., "Region A")
    sucursal: "All", // Set to specific sucursal for Operators (e.g., "Principal")
  };

  const handleLogin = (credentials) => {
    if (
      credentials.username === tempCredentials.username &&
      credentials.password === tempCredentials.password
    ) {
      setIsAuthenticated(true);
      setActiveModule("dashboard");
      setModuleParams({});
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule("dashboard");
    setModuleParams({});
  };

  const navigateTo = (module, params = {}) => {
    setActiveModule(module);
    setModuleParams(params);
  };

  const renderModule = () => {
    const commonProps = {
      onNavigate: navigateTo,
      onLogout: handleLogout,
      activeModule: activeModule,
      userInfo: userInfo,
      ...moduleParams, // Pass additional params (e.g., employeeId)
    };

    switch (activeModule) {
      case "dashboard":
        return <Dashboard {...commonProps} />;
      case "usuarios":
        return <ModuloUsuarios {...commonProps} />;
      case "empleados":
        return <ModuloEmpleados {...commonProps} />;
      case "sucursales":
        return <ModuloSucursales {...commonProps} />;
      case "regiones":
        return <ModuloRegiones {...commonProps} />;
      case "oficinas":
        return <ModuloOficinas {...commonProps} />;
      case "reportes":
        return <ModuloReportes {...commonProps} />;
      case "schedules":
        return <ScheduleManagement {...commonProps} />;
      case "attendance":
        return <AttendanceLog {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <ModalProvider>
        <Login onLogin={handleLogin} />
      </ModalProvider>
    );
  }

  return (
    <ModalProvider>
      <div className="app-container" style={{ display: "flex" }}>
        <Sidebar
          activeModule={activeModule}
          onNavigate={navigateTo}
          onLogout={handleLogout}
          userInfo={userInfo}
        />
        <div style={{ flex: 1, padding: "0px" }}>
          {renderModule()}
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;