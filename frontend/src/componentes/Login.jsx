import React, { useState, useContext, useEffect } from "react";
import "../estilos/Login.css";
import logo from "../assets/logo.png";
import { ModalContext } from "./ModalManager";
import { 
  FaUser, 
  FaLock, 
  FaSignInAlt, 
  FaBuilding, 
  FaUserShield, 
  FaFingerprint,
  FaCalendarCheck,
  FaChartLine,
  FaBell,
  FaFileExport,
  FaUserClock,
  FaClipboardList,
  FaLaptopCode
} from "react-icons/fa";

function Login({ onLogin }) {
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);

  // Efecto para iniciar la animación al cargar el componente
  useEffect(() => {
    // Pequeño retardo para asegurar que las transiciones se vean bien
    setTimeout(() => {
      setAnimateForm(true);
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError("Por favor, complete todos los campos");
      return;
    }
    
    // Mostrar animación de carga
    setLoading(true);
    
    // Simulando tiempo de carga
    setTimeout(() => {
      setLoading(false);
      onLogin(formData);
      showModal("welcome", `¡Bienvenido, ${formData.username}!`);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className={`login-card ${animateForm ? 'login-card-visible' : ''}`}>
        {/* Lado izquierdo - Logo y branding */}
        <div className="login-branding">
          <div className="login-logo-container">
            <img src={logo} alt="Logo" className="login-logo pulse-animation" />
          </div>
          <h1 className="login-brand-title">Sistema de Control de Asistencia</h1>
          <div className="login-brand-features">
            <div className="brand-feature">
              <div className="feature-icon">
                <FaFingerprint />
              </div>
              <span>Registro biométrico en tiempo real</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaCalendarCheck />
              </div>
              <span>Control preciso de horarios y turnos</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaUserShield />
              </div>
              <span>Gestión de permisos y ausencias</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaBuilding />
              </div>
              <span>Administración de sucursales</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <span>Reportes y analíticas avanzadas</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaBell />
              </div>
              <span>Notificaciones y alertas automáticas</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaFileExport />
              </div>
              <span>Exportación de datos en múltiples formatos</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaUserClock />
              </div>
              <span>Seguimiento de horas extra y compensaciones</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaClipboardList />
              </div>
              <span>Planificación y programación de turnos</span>
            </div>
            <div className="brand-feature">
              <div className="feature-icon">
                <FaLaptopCode />
              </div>
              <span>Interfaz moderna y personalizable</span>
            </div>
          </div>
        </div>
        
        {/* Lado derecho - Formulario de login */}
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Iniciar Sesión</h2>
            <p>Ingrese sus credenciales para acceder al sistema</p>
          </div>
          
          {error && (
            <div className="error-message slide-in-top">
              {error}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                <FaUser className="input-icon" />
                <span>Usuario</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Ingrese su usuario"
                className={`animated-input ${animateForm ? 'slide-in-right delay-1' : ''}`}
              />
              <div className="input-focus-bar"></div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                <span>Contraseña</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Ingrese su contraseña"
                className={`animated-input ${animateForm ? 'slide-in-right delay-2' : ''}`}
              />
              <div className="input-focus-bar"></div>
            </div>
            
            <div className="form-options">
              <button type="button" className="forgot-password">¿Olvidó su contraseña? <br />Contacte Con El Administrador</button>
            </div>
            
            <button 
              type="submit" 
              className={`btn-login ${animateForm ? 'slide-in-right delay-3' : ''} ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <FaSignInAlt className="btn-icon" />
                </>
              )}
            </button>
          </form>
          
          <div className="login-demo-info fade-in">
            <h3>Credenciales de prueba:</h3>
            <div className="demo-credentials">
              <div className="demo-credential">
                <span className="credential-label">Usuario:</span>
                <strong className="credential-value">admin</strong>
              </div>
              <div className="demo-credential">
                <span className="credential-label">Contraseña:</span>
                <strong className="credential-value">admin123</strong>
              </div>
            </div>
          </div>
          
          <div className="login-footer fade-in">
            <p>© 2025 Sistema de Control de Asistencia. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
      
      {/* Partículas animadas (reducidas en cantidad para mejor rendimiento) */}
      <div className="particles-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={index} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Login;