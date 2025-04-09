import React, { useState } from "react";
import "../estilos/DashBoard.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaChartBar } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  
  // Estado para datos de ejemplo del dashboard
  const [dashboardData, setDashboardData] = useState({
    totalEmpleados: 145,
    asistenciasHoy: 126,
    ausenciasHoy: 19,
    retrasosHoy: 8,
    porcentajeAsistencia: 87,
  });

  // Datos de ejemplo para la gráfica
  const attendanceData = [
    { día: "Lunes", asistencia: 95 },
    { día: "Martes", asistencia: 88 },
    { día: "Miércoles", asistencia: 90 },
    { día: "Jueves", asistencia: 87 },
    { día: "Viernes", asistencia: 85 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar Izquierda */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <MdFingerprint className="logo-icon" />
          <span>AsistControl</span>
        </div>
        
        <div className="sidebar-menu">
          <div className="sidebar-item active">
            <MdDashboard className="sidebar-icon" />
            <span>Dashboard</span>
          </div>
          <div className="sidebar-item">
            <FaUsers className="sidebar-icon" />
            <span>Empleados</span>
          </div>
          <div className="sidebar-item">
            <FaUserAlt className="sidebar-icon" />
            <span>Usuarios</span>
          </div>
          <div className="sidebar-item">
            <FaBuilding className="sidebar-icon" />
            <span>Sucursales</span>
          </div>
          <div className="sidebar-item">
            <FaMapMarkerAlt className="sidebar-icon" />
            <span>Regiones</span>
          </div>
          <div className="sidebar-item">
            <FaBuilding className="sidebar-icon" />
            <span>Oficinas</span>
          </div>
          <div className="sidebar-item">
            <FaFileAlt className="sidebar-icon" />
            <span>Reportes</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="current-date">{currentDate}</div>
        </div>

        {/* Cards de resumen */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <div className="card-icon employees">
              <FaUsers />
            </div>
            <div className="card-info">
              <h3>Total Empleados</h3>
              <p>{dashboardData.totalEmpleados}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon attendance">
              <MdFingerprint />
            </div>
            <div className="card-info">
              <h3>Asistencias Hoy</h3>
              <p>{dashboardData.asistenciasHoy}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon absence">
              <FaUserAlt />
            </div>
            <div className="card-info">
              <h3>Ausencias Hoy</h3>
              <p>{dashboardData.ausenciasHoy}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon delay">
              <FaChartBar />
            </div>
            <div className="card-info">
              <h3>% Asistencia</h3>
              <p>{dashboardData.porcentajeAsistencia}%</p>
            </div>
          </div>
        </div>

        {/* Gráficos y tablas */}
        <div className="dashboard-charts">
          <div className="chart-container">
            <h2>Registro de Asistencia Semanal</h2>
            <div className="chart-placeholder">
              {/* Aquí se integraría una gráfica real con library como recharts */}
              <div className="chart-bar-container">
                {attendanceData.map((item, index) => (
                  <div key={index} className="chart-bar-item">
                    <div className="chart-bar" style={{ height: `${item.asistencia}%` }}></div>
                    <div className="chart-bar-label">{item.día}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Actividad Reciente</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-time">09:15</div>
                <div className="activity-details">
                  <span className="activity-user">Juan Pérez</span> registró entrada
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">09:05</div>
                <div className="activity-details">
                  <span className="activity-user">María López</span> registró entrada
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">08:59</div>
                <div className="activity-details">
                  <span className="activity-user">Carlos Rodríguez</span> registró entrada
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">08:45</div>
                <div className="activity-details">
                  <span className="activity-user">Ana Martínez</span> registró entrada
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">08:30</div>
                <div className="activity-details">
                  <span className="activity-user">Roberto Gómez</span> registró entrada
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="sidebar right">
        <div className="user-profile">
          <div className="avatar">
            <FaUserAlt />
          </div>
          <div className="user-info">
            <h3>Admin Usuario</h3>
            <p>Administrador</p>
          </div>
        </div>

        <div className="sidebar-item logout">
          <MdExitToApp className="sidebar-icon" />
          <span>Cerrar Sesión</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;