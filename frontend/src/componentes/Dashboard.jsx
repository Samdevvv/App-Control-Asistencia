import React, { useState, useContext, useEffect } from "react";
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
    employee: "all",
    activityType: "all"
  });
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
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
  const [animateCharts, setAnimateCharts] = useState(false);

  // List of all employees with their details
  const allEmployees = [
    { id: "001", name: "Juan Pérez", dni: "28456789", branch: "Sucursal Principal" },
    { id: "002", name: "María López", dni: "31678234", branch: "Sucursal Este" },
    { id: "003", name: "Carlos Rodríguez", dni: "29876543", branch: "Sucursal Oeste" },
    { id: "004", name: "Ana Martínez", dni: "30123456", branch: "Sucursal Principal" },
    { id: "005", name: "Roberto Gómez", dni: "32541890", branch: "Sucursal Este" },
    { id: "006", name: "Laura Sánchez", dni: "30457812", branch: "Sucursal Principal" },
    { id: "007", name: "Miguel Torres", dni: "29654321", branch: "Sucursal Oeste" },
    { id: "008", name: "Patricia Díaz", dni: "31987654", branch: "Sucursal Este" },
    { id: "009", name: "Fernando Alvarez", dni: "28765432", branch: "Sucursal Principal" },
    { id: "010", name: "Sofía Ruiz", dni: "32109876", branch: "Sucursal Oeste" },
    // Adding more employees to demonstrate the need for search
    { id: "011", name: "Juan Pérez", dni: "30987654", branch: "Sucursal Este" }, // Same name as 001
    { id: "012", name: "María Rodríguez", dni: "29876123", branch: "Sucursal Principal" },
    { id: "013", name: "Pedro Gómez", dni: "31456789", branch: "Sucursal Oeste" },
    { id: "014", name: "Lucía Fernández", dni: "30567890", branch: "Sucursal Principal" },
    { id: "015", name: "Gabriel López", dni: "29345678", branch: "Sucursal Este" }
  ];

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
    { time: "08:40", user: "Laura Sánchez", action: "entrada" },
    { time: "08:35", user: "Miguel Torres", action: "entrada" },
    { time: "08:30", user: "Patricia Díaz", action: "salida" },
    { time: "08:25", user: "Fernando Alvarez", action: "entrada" },
    { time: "08:20", user: "Sofía Ruiz", action: "entrada" },
  ].filter(activity => userInfo.role !== "Operator" || activity.user.includes("Pérez")); // Example filter

  const topPerformers = [
    { name: "Juan Pérez", dni: "28456789", branch: "Sucursal Principal", attendanceRate: 98 },
    { name: "María López", dni: "31678234", branch: "Sucursal Este", attendanceRate: 97 },
    { name: "Carlos Rodríguez", dni: "29876543", branch: "Sucursal Oeste", attendanceRate: 96 },
    { name: "Laura Sánchez", dni: "30457812", branch: "Sucursal Principal", attendanceRate: 95 },
    { name: "Roberto Gómez", dni: "32541890", branch: "Sucursal Este", attendanceRate: 94 },
  ].filter(performer => userInfo.role !== "Operator" || performer.name.includes("Pérez"));

  const keyMetrics = {
    avgAttendanceRate: userInfo.role === "Operator" ? 90 : 87,
    mostPunctualBranch: userInfo.role === "Operator" ? userInfo.sucursal : "Sucursal Principal",
    highestAbsenteeismBranch: userInfo.role === "Operator" ? userInfo.sucursal : "Sucursal Oeste",
  };

  // Trigger animations after component mounts
  useEffect(() => {
    setTimeout(() => {
      setAnimateCharts(true);
    }, 300);
  }, []);

  // Get employee-specific data for dashboard
  const getEmployeeStats = (employeeId) => {
    // In a real app, this would fetch from backend
    // Mock data for demo purposes
    return {
      asistenciasUltimoMes: Math.floor(Math.random() * 20) + 18,
      puntualidadPorcentaje: Math.floor(Math.random() * 15) + 85,
      ausenciasUltimoMes: Math.floor(Math.random() * 3),
      horasExtrasMes: Math.floor(Math.random() * 15),
      diasVacacionesDisponibles: Math.floor(Math.random() * 10) + 5,
      rendimientoPromedio: Math.floor(Math.random() * 20) + 80,
      posicionRanking: Math.floor(Math.random() * 10) + 1,
      ultimaAsistencia: new Date(Date.now() - Math.floor(Math.random() * 3) * 86400000).toLocaleDateString()
    };
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const selectEmployee = (employeeId) => {
    setFilters({ ...filters, employee: employeeId });
    setShowEmployeeDropdown(false);
    // Clear search term to show selection clearly
    setEmployeeSearchTerm("");
  };

  const handleEmployeeSearch = (e) => {
    setEmployeeSearchTerm(e.target.value);
    if (e.target.value) {
      setShowEmployeeDropdown(true);
    } else {
      setShowEmployeeDropdown(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "today",
      branch: "all",
      employee: "all",
      activityType: "all"
    });
    setEmployeeSearchTerm("");
    setShowEmployeeDropdown(false);
    showModal("success", "Filtros limpiados!");
  };

  // Get the selected employee name if any
  const selectedEmployeeId = filters.employee;
  const selectedEmployee = selectedEmployeeId !== "all" 
    ? allEmployees.find(emp => emp.id === selectedEmployeeId) 
    : null;
  
  // Get employee-specific stats if an employee is selected
  const employeeStats = selectedEmployee ? getEmployeeStats(selectedEmployeeId) : null;
  
  const filteredActivities = recentActivities
    .filter(activity => filters.activityType === "all" || activity.action === filters.activityType)
    .filter(activity => filters.employee === "all" || activity.user === (selectedEmployee ? selectedEmployee.name : ""))
    .slice(0, activityPage * activitiesPerPage);
    
  // Filter employees based on search term
  const filteredEmployees = employeeSearchTerm 
    ? allEmployees.filter(emp => 
        emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) || 
        emp.dni.includes(employeeSearchTerm))
    : [];

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
            <div className="filter-group">
              <label>Sucursal:</label>
              <select name="branch" value={filters.branch} onChange={handleFilterChange}>
                <option value="all">Todas</option>
                <option value="principal">Sucursal Principal</option>
                <option value="este">Sucursal Este</option>
                <option value="oeste">Sucursal Oeste</option>
              </select>
            </div>
          )}
          <div className="filter-group employee-search">
            <label>Buscar Empleado:</label>
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar por nombre o DNI..."
                value={employeeSearchTerm}
                onChange={handleEmployeeSearch}
                onClick={() => setShowEmployeeDropdown(true)}
                className="employee-search-input"
              />
              {selectedEmployee && (
                <div className="selected-employee">
                  <span>Empleado seleccionado: </span>
                  <strong>{selectedEmployee.name}</strong> 
                  <span className="employee-details">
                    DNI: {selectedEmployee.dni} | {selectedEmployee.branch}
                  </span>
                  <button 
                    className="clear-selection" 
                    onClick={() => selectEmployee("all")}
                    title="Quitar selección"
                  >
                    ×
                  </button>
                </div>
              )}
              {showEmployeeDropdown && employeeSearchTerm.length > 0 && (
                <div className="employee-dropdown">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <div 
                        key={employee.id} 
                        className="employee-item"
                        onClick={() => selectEmployee(employee.id)}
                      >
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-detail">
                          <span className="employee-dni">DNI: {employee.dni}</span>
                          <span className="employee-branch">{employee.branch}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">No se encontraron empleados</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <button className="clear-filters-btn" onClick={clearFilters}>
            <FaFilter /> Limpiar Filtros
          </button>
        </div>

        <div className="dashboard-summary">
          {selectedEmployee ? (
            // Show employee-specific stats
            <>
              <div className="summary-card">
                <div className="card-icon attendance">
                  <MdFingerprint />
                </div>
                <div className="card-info">
                  <h3>Asistencias último mes</h3>
                  <p>{employeeStats.asistenciasUltimoMes}</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.asistenciasUltimoMes * (100/30)}%` : "0%" 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon on-time">
                  <FaChartBar />
                </div>
                <div className="card-info">
                  <h3>Puntualidad</h3>
                  <p>{employeeStats.puntualidadPorcentaje}%</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.puntualidadPorcentaje}%` : "0%",
                        backgroundColor: employeeStats.puntualidadPorcentaje > 90 ? "#198754" : 
                                        employeeStats.puntualidadPorcentaje > 80 ? "#ffc107" : "#dc3545"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon absence">
                  <FaUserAlt />
                </div>
                <div className="card-info">
                  <h3>Ausencias último mes</h3>
                  <p>{employeeStats.ausenciasUltimoMes}</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.ausenciasUltimoMes * (100/30)}%` : "0%",
                        backgroundColor: "#dc3545"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon overtime">
                  <FaClock />
                </div>
                <div className="card-info">
                  <h3>Horas extras</h3>
                  <p>{employeeStats.horasExtrasMes}</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.horasExtrasMes * 5}%` : "0%",
                        backgroundColor: "#6f42c1"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon employees" style={{backgroundColor: "rgba(23, 162, 184, 0.1)", color: "#17a2b8"}}>
                  <MdCalendarToday />
                </div>
                <div className="card-info">
                  <h3>Días de vacaciones disponibles</h3>
                  <p>{employeeStats.diasVacacionesDisponibles}</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.diasVacacionesDisponibles * 5}%` : "0%",
                        backgroundColor: "#17a2b8"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon branches" style={{backgroundColor: "rgba(253, 126, 20, 0.1)", color: "#fd7e14"}}>
                  <FaChartBar />
                </div>
                <div className="card-info">
                  <h3>Rendimiento promedio</h3>
                  <p>{employeeStats.rendimientoPromedio}%</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${employeeStats.rendimientoPromedio}%` : "0%",
                        backgroundColor: "#fd7e14"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon offices" style={{backgroundColor: "rgba(13, 110, 253, 0.1)", color: "#0d6efd"}}>
                  <FaUsers />
                </div>
                <div className="card-info">
                  <h3>Posición en ranking</h3>
                  <p>#{employeeStats.posicionRanking}</p>
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? `${100 - (employeeStats.posicionRanking * 10)}%` : "0%",
                        backgroundColor: "#0d6efd"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="card-icon delay">
                  <MdFingerprint />
                </div>
                <div className="card-info">
                  <h3>Última asistencia</h3>
                  <p>{employeeStats.ultimaAsistencia}</p>
                </div>
              </div>
            </>
          ) : (
            // Show general summary cards
            <>
              <div className="summary-card" onClick={() => onNavigate("empleados")}>
                <div className="card-icon employees">
                  <FaUsers />
                </div>
                <div className="card-info">
                  <h3>Total Empleados</h3>
                  <p>{dashboardData.totalEmpleados}</p>
                  <TrendIndicator value={dashboardData.trends.totalEmpleados} />
                  <div className="sparkline">
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "70%" : "0%"
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "60%" : "0%"
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "50%" : "0%" 
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "80%" : "0%" 
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "40%" : "0%" 
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "30%" : "0%" 
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "85%" : "0%" 
                      }}
                    ></div>
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
                    <div 
                      className="sparkline-bar" 
                      style={{ 
                        width: animateCharts ? "65%" : "0%" 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="key-metrics">
          {selectedEmployee ? (
            // Employee-specific metrics
            <div className="employee-detail-header">
              <div className="employee-avatar">{selectedEmployee.name.charAt(0)}</div>
              <div className="employee-info">
                <h2>Métricas de {selectedEmployee.name}</h2>
                <div className="employee-meta">
                  <span className="meta-item"><strong>DNI:</strong> {selectedEmployee.dni}</span>
                  <span className="meta-item"><strong>Sucursal:</strong> {selectedEmployee.branch}</span>
                  <span className="meta-item"><strong>Ranking:</strong> #{employeeStats.posicionRanking} de {allEmployees.length}</span>
                </div>
              </div>
            </div>
          ) : (
            // General metrics
            <>
              <h2>Métricas Clave</h2>
              <div className="metrics-grid">
                <div className={`metric-card ${animateCharts ? 'animate-in' : ''}`}>
                  <h3>Tasa Promedio de Asistencia</h3>
                  <p>{keyMetrics.avgAttendanceRate}%</p>
                </div>
                <div className={`metric-card ${animateCharts ? 'animate-in' : ''}`} style={{ animationDelay: '0.2s' }}>
                  <h3>Sucursal Más Puntual</h3>
                  <p>{keyMetrics.mostPunctualBranch}</p>
                </div>
                <div className={`metric-card ${animateCharts ? 'animate-in' : ''}`} style={{ animationDelay: '0.4s' }}>
                  <h3>Sucursal con Mayor Ausentismo</h3>
                  <p>{keyMetrics.highestAbsenteeismBranch}</p>
                </div>
              </div>
            </>
          )}
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
                          height: animateCharts ? `${(item.absent / 100) * 240}px` : '0px',
                          transitionDelay: `${index * 0.1}s`,
                          backgroundColor: "#dc3545",
                        }}
                        title={`Ausentes: ${item.absent}`}
                      ></div>
                      <div
                        className="chart-bar late"
                        style={{
                          height: animateCharts ? `${(item.late / 100) * 240}px` : '0px',
                          transitionDelay: `${index * 0.1 + 0.1}s`,
                          backgroundColor: "#ffc107",
                        }}
                        title={`Tardíos: ${item.late}`}
                      ></div>
                      <div
                        className="chart-bar on-time"
                        style={{
                          height: animateCharts ? `${(item.onTime / 100) * 240}px` : '0px',
                          transitionDelay: `${index * 0.1 + 0.2}s`,
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
              <div className={`pie-chart-container ${animateCharts ? 'animate-rotate' : ''}`}>
                {employeeStatusData.map((item, index) => {
                  const total = employeeStatusData.reduce((sum, d) => sum + d.value, 0);
                  const percentage = (item.value / total) * 100;
                  const degreeStart = employeeStatusData.slice(0, index).reduce((sum, d) => sum + d.value, 0) / total * 360;
                  
                  return (
                    <div
                      key={index}
                      className={`pie-slice ${animateCharts ? 'animate-in' : ''}`}
                      style={{
                        background: `conic-gradient(${item.color} 0% ${percentage}%, transparent ${percentage}% 100%)`,
                        transform: `rotate(${degreeStart}deg)`,
                        opacity: animateCharts ? 1 : 0,
                        transitionDelay: `${0.2 + index * 0.1}s`
                      }}
                    ></div>
                  );
                })}
              </div>
              <div className="pie-legend">
                {employeeStatusData.map((item, index) => (
                  <div key={index} className={`legend-item ${animateCharts ? 'animate-in' : ''}`} style={{ transitionDelay: `${0.5 + index * 0.1}s` }}>
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
                <div 
                  key={index} 
                  className={`activity-item ${animateCharts ? 'animate-in' : ''}`}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-details">
                    {activity.action === "entrada" ? 
                      <FaSignInAlt className="activity-icon entry" /> : 
                      <FaSignOutAlt className="activity-icon exit" />
                    }
                    <span className="activity-user">{activity.user}</span> registró {activity.action}
                  </div>
                </div>
              ))}
            </div>
            {filteredActivities.length < recentActivities.length && (
              <button 
                className={`load-more-btn ${animateCharts ? 'animate-in' : ''}`} 
                onClick={() => setActivityPage(page => page + 1)}
                style={{ transitionDelay: '0.8s' }}
              >
                Cargar Más
              </button>
            )}
          </div>
          <div className="top-performers">
            <h2>Mejores Asistencias</h2>
            <div className="performers-list">
              {topPerformers.map((performer, index) => (
                <div 
                  key={index} 
                  className={`performer-item ${animateCharts ? 'animate-in' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="performer-left">
                    <span className="performer-rank">{index + 1}.</span>
                    <div className="performer-info">
                      <span className="performer-name">{performer.name}</span>
                      <div className="performer-details">
                        <span className="performer-dni">DNI: {performer.dni}</span>
                        <span className="performer-branch">{performer.branch}</span>
                      </div>
                    </div>
                  </div>
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