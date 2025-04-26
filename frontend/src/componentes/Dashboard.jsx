import React, { useState, useContext } from "react";
import "../estilos/DashBoard.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaChartBar, FaArrowUp, FaArrowDown, FaSignInAlt, FaSignOutAlt, FaFilter, FaClock } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp, MdCalendarToday } from "react-icons/md";
import { ModalContext } from "./ModalManager"; // Replace ../contexts/ModalContext

function Dashboard({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [filters, setFilters] = useState({
    dateRange: "today",
    branch: "all",
    office: "all",
    employeeType: "all",
    activityType: "all"
  });
  const [dashboardData, setDashboardData] = useState({
    totalEmpleados: userInfo.role === "Operator" ? 50 : 145,
    totalOffices: userInfo.role === "Operator" ? 1 : 12,
    totalBranches: userInfo.role === "Operator" ? 1 : 5,
    asistenciasHoy: userInfo.role === "Operator" ? 45 : 126,
    ausenciasHoy: userInfo.role === "Operator" ? 5 : 19,
    retrasosHoy: userInfo.role === "Operator" ? 2 : 8,
    onTimeArrivals: userInfo.role === "Operator" ? 40 : 110,
    overtimeHours: userInfo.role === "Operator" ? 10 : 45,
    porcentajeAsistencia: userInfo.role === "Operator" ? 90 : 87,
    trends: {
      totalEmpleados: 2,
      asistenciasHoy: -3,
      ausenciasHoy: 1,
      retrasosHoy: 0,
      onTimeArrivals: 5,
      overtimeHours: -10
    }
  });

  const [activityPage, setActivityPage] = useState(1);
  const activitiesPerPage = 5;

  const weeklyAttendanceData = [
    { day: "Lun", onTime: 95, late: 5, absent: 2 },
    { day: "Mar", onTime: 88, late: 8, absent: 4 },
    { day: "Mié", onTime: 90, late: 6, absent: 3 },
    { day: "Jue", onTime: 87, late: 7, absent: 5 },
    { day: "Vie", onTime: 85, late: 9, absent: 6 },
  ].map(item => userInfo.role === "Operator" ? { ...item, onTime: Math.round(item.onTime * 0.3), late: Math.round(item.late * 0.3), absent: Math.round(item.absent * 0.3) } : item);

  const employeeStatusData = [
    { name: "Presentes", value: userInfo.role === "Operator" ? 45 : 126, color: "#198754" },
    { name: "Ausentes", value: userInfo.role === "Operator" ? 5 : 19, color: "#dc3545" },
    { name: "Tardíos", value: userInfo.role === "Operator" ? 2 : 8, color: "#ffc107" },
    { name: "De Licencia", value: userInfo.role === "Operator" ? 2 : 5, color: "#6c757d" },
  ];

  const recentActivities = [
    { time: "09:15", user: "Juan Pérez", action: "entrada" },
    { time: "09:05", user: "María López", action: "entrada" },
    { time: "09:00", user: "Carlos Rodríguez", action: "entrada" },
    { time: "08:55", user: "Ana Martínez", action: "salida" },
    { time: "08:45", user: "Roberto Gómez", action: "entrada" },
  ].filter(activity => userInfo.role !== "Operator" || activity.user.includes("Pérez")); // Example filter

  const topPerformers = [
    { name: "Juan Pérez", attendanceRate: 98 },
    { name: "María López", attendanceRate: 97 },
    { name: "Carlos Rodríguez", attendanceRate: 96 },
  ].filter(performer => userInfo.role !== "Operator" || performer.name.includes("Pérez"));

  const keyMetrics = {
    avgAttendanceRate: userInfo.role === "Operator" ? 90 : 87,
    mostPunctualBranch: userInfo.role === "Operator" ? userInfo.sucursal : "Sucursal Principal",
    highestAbsenteeismOffice: userInfo.role === "Operator" ? "Oficina Principal" : "Oficina Ventas",
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "today",
      branch: "all",
      office: "all",
      employeeType: "all",
      activityType: "all"
    });
    showModal("success", "Filters cleared!");
  };

  const filteredActivities = recentActivities
    .filter(activity => filters.activityType === "all" || activity.action === filters.activityType)
    .slice(0, activityPage * activitiesPerPage);

  const TrendIndicator = ({ value }) => (
    <span className={`trend ${value >= 0 ? "positive" : "negative"}`}>
      {value >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(value)}%
    </span>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard de Control de Asistencia</h1>
          <div className="current-date">
            <MdCalendarToday className="date-icon" /> {currentDate}
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            <label>Rango de Fecha:</label>
            <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
              <option value="today">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
            </select>
          </div>
          {userInfo.role !== "Operator" && (
            <>
              <div className="filter-group">
                <label>Sucursal:</label>
                <select name="branch" value={filters.branch} onChange={handleFilterChange}>
                  <option value="all">Todas</option>
                  <option value="principal">Sucursal Principal</option>
                  <option value="este">Sucursal Este</option>
                  <option value="oeste">Sucursal Oeste</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Oficina:</label>
                <select name="office" value={filters.office} onChange={handleFilterChange}>
                  <option value="all">Todas</option>
                  <option value="principal">Oficina Principal</option>
                  <option value="desarrollo">Oficina Desarrollo</option>
                  <option value="ventas">Oficina Ventas</option>
                </select>
              </div>
            </>
          )}
          <div className="filter-group">
            <label>Tipo de Empleado:</label>
            <select name="employeeType" value={filters.employeeType} onChange={handleFilterChange}>
              <option value="all">Todos</option>
              <option value="full-time">Tiempo Completo</option>
              <option value="part-time">Medio Tiempo</option>
            </select>
          </div>
          <button className="clear-filters-btn" onClick={clearFilters}>
            <FaFilter /> Limpiar Filtros
          </button>
        </div>

        <div className="dashboard-summary">
          <div className="summary-card" onClick={() => onNavigate("empleados")}>
            <div className="card-icon employees">
              <FaUsers />
            </div>
            <div className="card-info">
              <h3>Total Empleados</h3>
              <p>{dashboardData.totalEmpleados}</p>
              <TrendIndicator value={dashboardData.trends.totalEmpleados} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon offices">
              <FaBuilding />
            </div>
            <div className="card-info">
              <h3>Total Oficinas</h3>
              <p>{dashboardData.totalOffices}</p>
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon branches">
              <FaMapMarkerAlt />
            </div>
            <div className="card-info">
              <h3>Total Sucursales</h3>
              <p>{dashboardData.totalBranches}</p>
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon attendance">
              <MdFingerprint />
            </div>
            <div className="card-info">
              <h3>Asistencias Hoy</h3>
              <p>{dashboardData.asistenciasHoy}</p>
              <TrendIndicator value={dashboardData.trends.asistenciasHoy} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon absence">
              <FaUserAlt />
            </div>
            <div className="card-info">
              <h3>Ausencias Hoy</h3>
              <p>{dashboardData.ausenciasHoy}</p>
              <TrendIndicator value={dashboardData.trends.ausenciasHoy} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon delay">
              <FaClock />
            </div>
            <div className="card-info">
              <h3>Retrasos Hoy</h3>
              <p>{dashboardData.retrasosHoy}</p>
              <TrendIndicator value={dashboardData.trends.retrasosHoy} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon on-time">
              <FaChartBar />
            </div>
            <div className="card-info">
              <h3>Llegadas a Tiempo</h3>
              <p>{dashboardData.onTimeArrivals}</p>
              <TrendIndicator value={dashboardData.trends.onTimeArrivals} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon overtime">
              <FaClock />
            </div>
            <div className="card-info">
              <h3>Horas Extras</h3>
              <p>{dashboardData.overtimeHours}</p>
              <TrendIndicator value={dashboardData.trends.overtimeHours} />
              <div className="sparkline">
                <div className="sparkline-bar" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="key-metrics">
          <h2>Métricas Clave</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Tasa Promedio de Asistencia</h3>
              <p>{keyMetrics.avgAttendanceRate}%</p>
            </div>
            <div className="metric-card">
              <h3>Sucursal Más Puntual</h3>
              <p>{keyMetrics.mostPunctualBranch}</p>
            </div>
            <div className="metric-card">
              <h3>Oficina con Mayor Ausentismo</h3>
              <p>{keyMetrics.highestAbsenteeismOffice}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="chart-container">
            <h2>Registro de Asistencia Semanal</h2>
            <div className="chart-placeholder">
              <div className="chart-bar-container">
                {weeklyAttendanceData.map((item, index) => (
                  <div key={index} className="chart-bar-item">
                    <div className="chart-bar-stack">
                      <div
                        className="chart-bar absent"
                        style={{
                          height: `${(item.absent / 100) * 240}px`,
                          backgroundColor: "#dc3545",
                        }}
                        title={`Ausentes: ${item.absent}`}
                      ></div>
                      <div
                        className="chart-bar late"
                        style={{
                          height: `${(item.late / 100) * 240}px`,
                          backgroundColor: "#ffc107",
                        }}
                        title={`Tardíos: ${item.late}`}
                      ></div>
                      <div
                        className="chart-bar on-time"
                        style={{
                          height: `${(item.onTime / 100) * 240}px`,
                          backgroundColor: "#198754",
                        }}
                        title={`A Tiempo: ${item.onTime}`}
                      ></div>
                    </div>
                    <div className="chart-bar-label">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-container pie-chart">
            <h2>Distribución de Estados</h2>
            <div className="chart-placeholder">
              <div className="pie-chart-container">
                {employeeStatusData.map((item, index) => (
                  <div
                    key={index}
                    className="pie-slice"
                    style={{
                      background: `conic-gradient(${item.color} 0% ${item.value / employeeStatusData.reduce((sum, d) => sum + d.value, 0) * 100}%, transparent ${item.value / employeeStatusData.reduce((sum, d) => sum + d.value, 0) * 100}% 100%)`,
                      transform: `rotate(${(employeeStatusData.slice(0, index).reduce((sum, d) => sum + d.value, 0) / employeeStatusData.reduce((sum, d) => sum + d.value, 0)) * 360}deg)`
                    }}
                  ></div>
                ))}
              </div>
              <div className="pie-legend">
                {employeeStatusData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                    {item.name}: {item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-bottom">
          <div className="recent-activity">
            <div className="activity-header">
              <h2>Actividad Reciente</h2>
              <select name="activityType" value={filters.activityType} onChange={handleFilterChange}>
                <option value="all">Todas</option>
                <option value="entrada">Entradas</option>
                <option value="salida">Salidas</option>
              </select>
            </div>
            <div className="activity-list">
              {filteredActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-details">
                    {activity.action === "entrada" ? <FaSignInAlt className="activity-icon entry" /> : <FaSignOutAlt className="activity-icon exit" />}
                    <span className="activity-user">{activity.user}</span> registró {activity.action}
                  </div>
                </div>
              ))}
            </div>
            {filteredActivities.length < recentActivities.length && (
              <button className="load-more-btn" onClick={() => setActivityPage(page => page + 1)}>
                Cargar Más
              </button>
            )}
          </div>
          <div className="top-performers">
            <h2>Mejores Asistencias</h2>
            <div className="performers-list">
              {topPerformers.map((performer, index) => (
                <div key={index} className="performer-item">
                  <span className="performer-rank">{index + 1}.</span>
                  <span className="performer-name">{performer.name}</span>
                  <span className="performer-rate">{performer.attendanceRate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;