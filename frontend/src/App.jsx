import React, { useState } from "react";
import "./App.css";
import Sidebar from "./componentes/Sidebar";
import Login from "./componentes/Login";
import Dashboard from "./componentes/Dashboard";
import ModuloUsuarios from "./componentes/ModuloUsuarios";
import ModuloEmpleados from "./componentes/Empleados";
import ModuloSucursales from "./componentes/Sucursales";
import ModuloRegiones from "./componentes/Regiones";
import ModuloOficinas from "./componentes/Oficinas";
import ModuloReportes from "./componentes/Reportes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState("dashboard");

  const tempCredentials = {
    username: "admin",
    password: "admin123"
  };

  const handleLogin = (credentials) => {
    if (
      credentials.username === tempCredentials.username &&
      credentials.password === tempCredentials.password
    ) {
      setIsAuthenticated(true);
      setActiveModule("dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule("dashboard");
  };

  const navigateTo = (module) => {
    setActiveModule(module);
  };

  const renderModule = () => {
    const commonProps = {
      onNavigate: navigateTo,
      onLogout: handleLogout,
      activeModule: activeModule
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
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container" style={{ display: "flex" }}>
      <Sidebar
        activeModule={activeModule}
        onNavigate={navigateTo}
        onLogout={handleLogout}
        userInfo={{ name: "Daniel", role: "Administrador" }}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        {renderModule()}
      </div>
    </div>
  );
}

export default App;
