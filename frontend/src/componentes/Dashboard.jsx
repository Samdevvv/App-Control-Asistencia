import React, { useState } from "react";
import "../estilos/DashBoard.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaChartBar } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";


function Dashboard({ onNavigate, onLogout, activeModule }) {
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
              <i className="fas fa-users"></i>
            </div>
            <div className="card-info">
              <h3>Total Empleados</h3>
              <p>{dashboardData.totalEmpleados}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon attendance">
              <i className="fas fa-fingerprint"></i>
            </div>
            <div className="card-info">
              <h3>Asistencias Hoy</h3>
              <p>{dashboardData.asistenciasHoy}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon absence">
              <i className="fas fa-user-slash"></i>
            </div>
            <div className="card-info">
              <h3>Ausencias Hoy</h3>
              <p>{dashboardData.ausenciasHoy}</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon delay">
              <i className="fas fa-chart-bar"></i>
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
      
    </div>
  );
}

export default Dashboard;