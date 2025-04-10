import React, { useState } from "react";
import "../estilos/Login.css";
import logo from "../assets/logo.png"; // Asegúrate de tener un logo en esta ruta

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.username || !formData.password) {
      setError("Por favor, complete todos los campos");
      return;
    }
    
    // Llamar a la función de inicio de sesión del componente padre
    onLogin(formData);
  };

  return (
    <div className="login-container">
      <div className="login-sidebar left"></div>
      
      <div className="login-content">
        <div className="login-box">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="login-title">Control de Asistencia</h1>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Ingrese su usuario"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Ingrese su contraseña"
              />
            </div>
            
            <button type="submit" className="btn-login">
              Iniciar Sesión
            </button>
          </form>
          
          <div className="login-footer">
            <p>Sistema de Control de Asistencia</p>
            <p>© 2025 Todos los derechos reservados</p>
          </div>
          
          <div className="login-demo-info">
            <p>Credenciales de prueba:</p>
            <p>Usuario: <strong>admin</strong></p>
            <p>Contraseña: <strong>admin123</strong></p>
          </div>
        </div>
      </div>
      
      <div className="login-sidebar right"></div>
    </div>
  );
}

export default Login;