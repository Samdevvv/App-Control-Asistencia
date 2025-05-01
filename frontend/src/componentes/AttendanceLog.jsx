import React, { useState, useContext, useEffect } from "react";
import "../estilos/AttendanceLog.css";
import { 
  FaSearch, FaCheckCircle, FaTimesCircle, 
  FaExclamationTriangle, FaRegClock, FaIdCard, FaMapMarkerAlt,
  FaCalendarAlt, FaFilter, FaBell, FaFileExport, FaRegCalendarAlt,
  FaArrowUp, FaArrowDown, FaSortAmountDown, FaRegChartBar
} from "react-icons/fa";
import { ModalContext } from "./ModalManager";

function RegistroDeEntrada({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Estado para los registros de asistencia con toda la información requerida
  const [attendanceLogs, setAttendanceLogs] = useState([
    { 
      id: 1, 
      employee: "Juan Pérez", 
      dni: "12345678A",
      region: "Central",
      date: "2023-04-20", 
      entryTime: "08:02", 
      exitTime: "17:05", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Principal",
      isAbsent: false,
      isJustified: true,
      justificationReason: "",
      isLate: true,
      lateMinutes: 2,
      earlyEntry: false,
      earlyEntryMinutes: 0,
      earlyExit: false,
      earlyExitMinutes: 0,
      lateExit: true,
      lateExitMinutes: 5,
      status: "Completo",
      observaciones: "Entrada con retraso leve"
    },
    { 
      id: 2, 
      employee: "María González", 
      dni: "87654321B",
      region: "Este",
      date: "2023-04-20", 
      entryTime: "08:10", 
      exitTime: "", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Sucursal A",
      isAbsent: false,
      isJustified: false,
      justificationReason: "",
      isLate: true,
      lateMinutes: 10,
      earlyEntry: false,
      earlyEntryMinutes: 0,
      earlyExit: false,
      earlyExitMinutes: 0,
      lateExit: false,
      lateExitMinutes: 0,
      status: "Pendiente salida",
      observaciones: "Entrada con retraso"
    },
    { 
      id: 3, 
      employee: "Carlos Rodríguez", 
      dni: "23456789C",
      region: "Oeste",
      date: "2023-04-20", 
      entryTime: "07:55", 
      exitTime: "16:50", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Sucursal B",
      isAbsent: false,
      isJustified: false,
      justificationReason: "",
      isLate: false,
      lateMinutes: 0,
      earlyEntry: true,
      earlyEntryMinutes: 5,
      earlyExit: true,
      earlyExitMinutes: 10,
      lateExit: false,
      lateExitMinutes: 0,
      status: "Completo",
      observaciones: "Salida anticipada"
    },
    { 
      id: 4, 
      employee: "Ana Martínez", 
      dni: "34567890D",
      region: "Norte",
      date: "2023-04-20", 
      entryTime: "", 
      exitTime: "", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Sucursal C",
      isAbsent: true,
      isJustified: true,
      justificationReason: "Permiso médico",
      isLate: false,
      lateMinutes: 0,
      earlyEntry: false,
      earlyEntryMinutes: 0,
      earlyExit: false,
      earlyExitMinutes: 0,
      lateExit: false,
      lateExitMinutes: 0,
      status: "Ausencia",
      observaciones: "Ausencia justificada por consulta médica"
    },
    { 
      id: 5, 
      employee: "Luis Sánchez", 
      dni: "45678901E",
      region: "Sur",
      date: "2023-04-20", 
      entryTime: "09:30", 
      exitTime: "17:15", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Sucursal D",
      isAbsent: false,
      isJustified: true,
      justificationReason: "Tráfico intenso por accidente",
      isLate: true,
      lateMinutes: 90,
      earlyEntry: false,
      earlyEntryMinutes: 0,
      earlyExit: false,
      earlyExitMinutes: 0,
      lateExit: true,
      lateExitMinutes: 15,
      status: "Completo",
      observaciones: "Retraso significativo con justificación"
    },
    { 
      id: 6, 
      employee: "Pedro Díaz", 
      dni: "56789012F",
      region: "Central",
      date: "2023-04-20", 
      entryTime: "", 
      exitTime: "", 
      scheduledEntry: "08:00",
      scheduledExit: "17:00",
      sucursal: "Principal",
      isAbsent: true,
      isJustified: false,
      justificationReason: "",
      isLate: false,
      lateMinutes: 0,
      earlyEntry: false,
      earlyEntryMinutes: 0,
      earlyExit: false,
      earlyExitMinutes: 0,
      lateExit: false,
      lateExitMinutes: 0,
      status: "Ausencia",
      observaciones: "Ausencia no justificada"
    }
  ]);

  // Regiones disponibles
  const regiones = ["Central", "Este", "Oeste", "Norte", "Sur"];

  // Estado para datos de resumen
  const [summaryData, setSummaryData] = useState({
    totalRegistros: 0,
    asistenciaCompleta: 0,
    ausencias: 0,
    ausenciasJustificadas: 0,
    llegadasTarde: 0,
    salidasTempranas: 0,
    pendientes: 0
  });

  // Actualizar datos de resumen cuando cambian los registros
  useEffect(() => {
    const total = attendanceLogs.length;
    const completos = attendanceLogs.filter(log => log.entryTime && log.exitTime).length;
    const ausencias = attendanceLogs.filter(log => log.isAbsent).length;
    const ausenciasJustificadas = attendanceLogs.filter(log => log.isAbsent && log.isJustified).length;
    const llegadasTarde = attendanceLogs.filter(log => log.isLate).length;
    const salidasTempranas = attendanceLogs.filter(log => log.earlyExit).length;
    const pendientes = attendanceLogs.filter(log => log.entryTime && !log.exitTime).length;

    setSummaryData({
      totalRegistros: total,
      asistenciaCompleta: completos,
      ausencias: ausencias,
      ausenciasJustificadas: ausenciasJustificadas,
      llegadasTarde: llegadasTarde,
      salidasTempranas: salidasTempranas,
      pendientes: pendientes
    });
  }, [attendanceLogs]);

  // Filtrar los registros según búsqueda y filtros
  const filteredLogs = attendanceLogs.filter(log => {
    // Filtro por permisos de usuario
    const hasPermission = 
      userInfo?.role === "Admin" ||
      (userInfo?.role === "Supervisor" && log.region === userInfo.region) ||
      (userInfo?.role === "Operator" && log.sucursal === userInfo.sucursal);
    
    if (!hasPermission) return false;
    
    // Filtro por término de búsqueda
    const matchesSearch = 
      log.employee.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.dni.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.date.includes(searchTerm);
    
    if (!matchesSearch) return false;
    
    // Filtro por fecha
    if (dateFilter && log.date !== dateFilter) return false;
    
    // Filtro por región
    if (regionFilter && log.region !== regionFilter) return false;
    
    // Filtro por estado
    if (statusFilter) {
      switch(statusFilter) {
        case "completo":
          if (log.status !== "Completo") return false;
          break;
        case "pendiente":
          if (log.status !== "Pendiente salida") return false;
          break;
        case "ausencia":
          if (!log.isAbsent) return false;
          break;
        case "justificado":
          if (!log.isJustified) return false;
          break;
        case "tarde":
          if (!log.isLate) return false;
          break;
        default:
          break;
      }
    }
    
    // Filtro por tipo
    if (filterType !== "todos") {
      switch(filterType) {
        case "completos":
          return log.entryTime && log.exitTime;
        case "pendientes":
          return log.entryTime && !log.exitTime;
        case "ausencias":
          return log.isAbsent;
        case "justificados":
          return log.isJustified;
        case "retrasos":
          return log.isLate;
        case "temprano":
          return log.earlyExit;
        default:
          return true;
      }
    }
    
    return true;
  });

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar página
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // Renderizar los números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredLogs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Calcular el estado de un registro (para clases CSS)
  const getStatusClass = (log) => {
    if (log.isAbsent) {
      return log.isJustified ? "estado-ausencia-justificada" : "estado-ausencia";
    }
    if (!log.entryTime && !log.exitTime) return "estado-ausencia";
    if (log.entryTime && !log.exitTime) return "estado-pendiente";
    if (log.isLate || log.earlyExit) return "estado-irregular";
    return "estado-completo";
  };

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header animated-fade-in">
          <h1>Registro de Asistencia</h1>
          <div className="header-actions">
            <div className="search-container animated-slide-in">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por empleado, DNI o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button 
                className="filter-button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="filters-container animated-slide-in">
            <div className="filter-group">
              <label>Fecha:</label>
              <div className="filter-input-container">
                <FaCalendarAlt className="filter-icon" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Región:</label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas</option>
                {regiones.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Estado:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Todos</option>
                <option value="completo">Completo</option>
                <option value="pendiente">Pendiente</option>
                <option value="ausencia">Ausencia</option>
                <option value="justificado">Justificado</option>
                <option value="tarde">Tardanza</option>
              </select>
            </div>
            <button 
              className="btn-clear-filters"
              onClick={() => {
                setDateFilter("");
                setRegionFilter("");
                setStatusFilter("");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Tarjetas de resumen */}
        <div className="summary-cards animated-stagger">
          <div className="summary-card">
            <div className="summary-icon">
              <FaRegClock />
            </div>
            <div className="summary-info">
              <span className="summary-title">Total Registros</span>
              <span className="summary-value">{summaryData.totalRegistros}</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon green">
              <FaCheckCircle />
            </div>
            <div className="summary-info">
              <span className="summary-title">Asistencias Completas</span>
              <span className="summary-value">{summaryData.asistenciaCompleta}</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon red">
              <FaTimesCircle />
            </div>
            <div className="summary-info">
              <span className="summary-title">Ausencias</span>
              <span className="summary-value">{summaryData.ausencias}</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon orange">
              <FaExclamationTriangle />
            </div>
            <div className="summary-info">
              <span className="summary-title">Llegadas Tarde</span>
              <span className="summary-value">{summaryData.llegadasTarde}</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon blue">
              <FaBell />
            </div>
            <div className="summary-info">
              <span className="summary-title">Pendientes</span>
              <span className="summary-value">{summaryData.pendientes}</span>
            </div>
          </div>
        </div>

        {/* Filtros rápidos */}
        <div className="filter-tabs animated-slide-in">
          <button 
            className={`filter-tab ${filterType === "todos" ? "active" : ""}`}
            onClick={() => setFilterType("todos")}
          >
            Todos
          </button>
          <button 
            className={`filter-tab ${filterType === "completos" ? "active" : ""}`}
            onClick={() => setFilterType("completos")}
          >
            Completos
          </button>
          <button 
            className={`filter-tab ${filterType === "pendientes" ? "active" : ""}`}
            onClick={() => setFilterType("pendientes")}
          >
            Pendientes
          </button>
          <button 
            className={`filter-tab ${filterType === "ausencias" ? "active" : ""}`}
            onClick={() => setFilterType("ausencias")}
          >
            Ausencias
          </button>
          <button 
            className={`filter-tab ${filterType === "retrasos" ? "active" : ""}`}
            onClick={() => setFilterType("retrasos")}
          >
            Retrasos
          </button>
          <button 
            className={`filter-tab ${filterType === "temprano" ? "active" : ""}`}
            onClick={() => setFilterType("temprano")}
          >
            Salidas tempranas
          </button>
        </div>

        <div className="table-actions animated-fade-in">
          <div className="table-info">
            Mostrando {currentItems.length} de {filteredLogs.length} registros
          </div>
          <div className="table-buttons">
            <button className="btn-export">
              <FaFileExport /> Exportar
            </button>
            <button className="btn-reports">
              <FaRegChartBar /> Reportes
            </button>
          </div>
        </div>

        <div className="table-container animated-zoom-in">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empleado</th>
                  <th>DNI</th>
                  <th>Región</th>
                  <th>
                    <div className="th-content">
                      <span>Fecha</span>
                      <FaArrowDown className="sort-icon" />
                    </div>
                  </th>
                  <th>Hora Entrada</th>
                  <th>Hora Salida</th>
                  <th>Estado</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((log) => (
                    <tr key={log.id} className={getStatusClass(log)}>
                      <td>{log.id}</td>
                      <td>{log.employee}</td>
                      <td>
                        <div className="dni-container">
                          <FaIdCard className="dni-icon" />
                          <span>{log.dni}</span>
                        </div>
                      </td>
                      <td>
                        <div className="region-container">
                          <FaMapMarkerAlt className="region-icon" />
                          <span>{log.region}</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-container">
                          <FaRegCalendarAlt className="date-icon" />
                          <span>{log.date}</span>
                        </div>
                      </td>
                      <td>
                        {log.entryTime ? (
                          <div className={`time-container ${log.isLate ? 'time-late' : log.earlyEntry ? 'time-early' : ''}`}>
                            {log.entryTime}
                            {log.isLate && <span className="time-diff">+{log.lateMinutes}m</span>}
                            {log.earlyEntry && <span className="time-diff-early">-{log.earlyEntryMinutes}m</span>}
                          </div>
                        ) : log.isAbsent ? (
                          <span className="no-time">Ausente</span>
                        ) : (
                          <span className="no-time">-</span>
                        )}
                      </td>
                      <td>
                        {log.exitTime ? (
                          <div className={`time-container ${log.earlyExit ? 'time-early' : log.lateExit ? 'time-late' : ''}`}>
                            {log.exitTime}
                            {log.earlyExit && <span className="time-diff-early">-{log.earlyExitMinutes}m</span>}
                            {log.lateExit && <span className="time-diff">+{log.lateExitMinutes}m</span>}
                          </div>
                        ) : log.isAbsent ? (
                          <span className="no-time">Ausente</span>
                        ) : (
                          <span className="no-time">-</span>
                        )}
                      </td>
                      <td>
                        <div className={`status-badge ${log.isAbsent 
                            ? (log.isJustified ? 'status-justified' : 'status-absent') 
                            : (!log.exitTime && log.entryTime) 
                              ? 'status-pending' 
                              : log.isLate || log.earlyExit 
                                ? 'status-irregular' 
                                : 'status-complete'}`}
                        >
                          {log.isAbsent 
                            ? (log.isJustified ? 'Ausencia justificada' : 'Ausencia') 
                            : (!log.exitTime && log.entryTime) 
                              ? 'Pendiente salida' 
                              : (log.entryTime && log.exitTime) 
                                ? 'Completo' 
                                : 'No registrado'}
                        </div>
                      </td>
                      <td>
                        <div className="observaciones-container" title={log.observaciones}>
                          {log.observaciones.length > 30 
                            ? log.observaciones.substring(0, 30) + "..." 
                            : log.observaciones || "-"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-records">No se encontraron registros de asistencia</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        {filteredLogs.length > itemsPerPage && (
          <div className="pagination-container">
            <button 
              className="pagination-button"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            
            <div className="pagination-numbers">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-button"
              onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistroDeEntrada;