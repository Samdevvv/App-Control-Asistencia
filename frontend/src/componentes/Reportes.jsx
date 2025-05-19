import React, { useState, useEffect, useContext } from "react";
import "../estilos/Reportes.css";
import {
  FaFileAlt,
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaChartPie,
  FaTable,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaClipboardList,
  FaBell,
  FaClock,
  FaUserAlt,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaSync,
  FaAngleDown,
  FaAngleUp,
  FaShareAlt,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaEye,
  FaChartLine
} from "react-icons/fa";
import { ModalContext } from "./ModalManager"; // Replace ../contexts/ModalContext

function Reportes({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [displayView, setDisplayView] = useState("chart"); // "chart", "pie", "table"
  const [currentChart, setCurrentChart] = useState("attendance");
  const [dateType, setDateType] = useState("month");
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  
  const [filters, setFilters] = useState({
    dateRange: "month",
    sucursal: userInfo.role === "Operator" ? userInfo.sucursal : "all",
    departamento: "all",
    cargo: "all",
    empleado: "all",
    estado: "all",
    reportType: "attendance",
    sortBy: "date",
    sortDirection: "desc"
  });
  
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "attendance",
      title: "Reporte de Asistencia",
      date: "2025-04-20",
      sucursal: "Principal",
      departamento: "TI",
      summary: "90% tasa de asistencia",
      details: "145 empleados presentes, 15 ausentes, 5 con retraso",
      stats: {
        presente: 145,
        ausente: 15,
        retraso: 5
      }
    },
    {
      id: 2,
      type: "absence",
      title: "Reporte de Ausencias",
      date: "2025-04-20",
      sucursal: "Sucursal A",
      departamento: "RRHH",
      summary: "5 empleados ausentes",
      details: "2 por enfermedad, 1 por permiso, 2 sin justificar",
      stats: {
        enfermedad: 2,
        permiso: 1,
        sinJustificar: 2
      }
    },
    {
      id: 3,
      type: "punctuality",
      title: "Reporte de Puntualidad",
      date: "2025-04-20",
      sucursal: "Sucursal B",
      departamento: "Finanzas",
      summary: "95% llegadas a tiempo",
      details: "38 empleados a tiempo, 2 con retrasos",
      stats: {
        aTiempo: 38,
        retraso: 2
      }
    },
    {
      id: 4,
      type: "overtime",
      title: "Reporte de Horas Extras",
      date: "2025-04-19",
      sucursal: "Principal",
      departamento: "Ventas",
      summary: "120 horas extras acumuladas",
      details: "15 empleados, promedio de 8 horas por empleado",
      stats: {
        totalHoras: 120,
        empleados: 15,
        promedio: 8
      }
    },
    {
      id: 5,
      type: "monthly",
      title: "Reporte Mensual Consolidado",
      date: "2025-03-31",
      sucursal: "Todas",
      departamento: "Todos",
      summary: "Resumen del mes de Marzo 2025",
      details: "Asistencia promedio: 92%, Ausencias: 8%, Puntualidad: 95%",
      stats: {
        asistencia: 92,
        ausencia: 8,
        puntualidad: 95
      }
    }
  ]);

  // Lista de departamentos
  const departamentos = ["TI", "RRHH", "Finanzas", "Ventas", "Marketing", "Operaciones", "Logística", "Administración"];
  
  // Lista de sucursales
  const sucursales = userInfo.role === "Operator" ? 
    [userInfo.sucursal] : 
    ["Principal", "Sucursal A", "Sucursal B", "Sucursal C", "Sucursal D"];
  
  // Lista de cargos
  const cargos = ["Gerente", "Supervisor", "Analista", "Técnico", "Asistente", "Operario", "Vendedor", "Administrativo"];
  
  // Lista de empleados
  const empleados = [
    "Juan Pérez", 
    "María López", 
    "Carlos Rodríguez", 
    "Ana Martínez", 
    "Roberto Gómez",
    "Laura Sánchez",
    "Miguel Torres",
    "Patricia Díaz"
  ];
  
  // Tipos de reportes disponibles
  const reportTypes = [
    { id: "attendance", name: "Asistencia", icon: <FaRegCalendarCheck /> },
    { id: "absence", name: "Ausencias", icon: <FaRegCalendarTimes /> },
    { id: "punctuality", name: "Puntualidad", icon: <FaClock /> },
    { id: "overtime", name: "Horas Extras", icon: <FaClipboardList /> },
    { id: "monthly", name: "Reporte Mensual", icon: <FaChartLine /> }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleExpandFilter = (filterName) => {
    if (expandedFilter === filterName) {
      setExpandedFilter(null);
    } else {
      setExpandedFilter(filterName);
    }
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    setCustomDateRange({
      ...customDateRange,
      [name]: value
    });
  };

  const handleDateTypeChange = (type) => {
    setDateType(type);
    setFilters({ ...filters, dateRange: type });
  };

  const handleSortChange = (field) => {
    if (filters.sortBy === field) {
      setFilters({
        ...filters,
        sortDirection: filters.sortDirection === "asc" ? "desc" : "asc"
      });
    } else {
      setFilters({
        ...filters,
        sortBy: field,
        sortDirection: "asc"
      });
    }
  };

  const handleReportTypeChange = (type) => {
    setFilters({ ...filters, reportType: type });
    setCurrentChart(type);
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    
    // Simular tiempo de carga
    setTimeout(() => {
      setIsLoading(false);
      showModal("success", "¡Reporte generado exitosamente!");
    }, 1200);
  };

  const handleDownloadReport = (id, format = "pdf") => {
    const report = reports.find(r => r.id === id);
    showModal("success", `Descargando reporte ${report.title} en formato ${format.toUpperCase()}...`);
  };

  const handleExportReport = (format) => {
    showModal("success", `Exportando reporte en formato ${format.toUpperCase()}...`);
  };

  const handlePrintReport = () => {
    showModal("success", "Enviando reporte a impresión...");
  };

  const handleShareReport = () => {
    showModal("input", "Compartir Reporte", "Ingrese el correo electrónico del destinatario:", (email) => {
      if (email) {
        showModal("success", `Reporte compartido con ${email}`);
      }
    });
  };

  const filteredReports = reports.filter(
    (report) =>
      (userInfo.role === "Admin" ||
        (userInfo.role === "Supervisor" && report.sucursal === userInfo.region) ||
        (userInfo.role === "Operator" && report.sucursal === userInfo.sucursal)) &&
      (filters.reportType === "all" || report.type === filters.reportType) &&
      (filters.sucursal === "all" || report.sucursal === filters.sucursal) &&
      (filters.departamento === "all" || report.departamento === filters.departamento)
  ).sort((a, b) => {
    const direction = filters.sortDirection === "asc" ? 1 : -1;
    if (filters.sortBy === "date") {
      return direction * (new Date(a.date) - new Date(b.date));
    }
    if (filters.sortBy === "type") {
      return direction * a.type.localeCompare(b.type);
    }
    if (filters.sortBy === "sucursal") {
      return direction * a.sucursal.localeCompare(b.sucursal);
    }
    if (filters.sortBy === "departamento") {
      return direction * a.departamento.localeCompare(b.departamento);
    }
    return 0;
  });

  useEffect(() => {
    // Animate chart bars on load
    const timer = setTimeout(() => {
      const chartBars = document.querySelectorAll('.bar');
      chartBars.forEach(bar => {
        bar.style.height = bar.getAttribute('data-height');
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [displayView, currentChart]);

  // Datos para gráficos de ejemplo
  const chartData = {
    attendance: [
      { day: "Lun", presente: 95, ausente: 5, retraso: 2 },
      { day: "Mar", presente: 90, ausente: 10, retraso: 5 },
      { day: "Mié", presente: 93, ausente: 7, retraso: 3 },
      { day: "Jue", presente: 88, ausente: 12, retraso: 6 },
      { day: "Vie", presente: 92, ausente: 8, retraso: 4 }
    ],
    absence: [
      { day: "Lun", enfermedad: 2, permiso: 1, sinJustificar: 2 },
      { day: "Mar", enfermedad: 4, permiso: 2, sinJustificar: 4 },
      { day: "Mié", enfermedad: 3, permiso: 1, sinJustificar: 3 },
      { day: "Jue", enfermedad: 5, permiso: 3, sinJustificar: 4 },
      { day: "Vie", enfermedad: 2, permiso: 2, sinJustificar: 4 }
    ],
    punctuality: [
      { day: "Lun", aTiempo: 95, retraso: 5 },
      { day: "Mar", aTiempo: 90, retraso: 10 },
      { day: "Mié", aTiempo: 93, retraso: 7 },
      { day: "Jue", aTiempo: 88, retraso: 12 },
      { day: "Vie", aTiempo: 92, retraso: 8 }
    ],
    overtime: [
      { day: "Lun", horas: 15 },
      { day: "Mar", horas: 20 },
      { day: "Mié", horas: 18 },
      { day: "Jue", horas: 25 },
      { day: "Vie", horas: 22 }
    ],
    monthly: [
      { month: "Ene", asistencia: 95, ausencia: 5, puntualidad: 92 },
      { month: "Feb", asistencia: 93, ausencia: 7, puntualidad: 90 },
      { month: "Mar", asistencia: 94, ausencia: 6, puntualidad: 91 },
      { month: "Abr", asistencia: 92, ausencia: 8, puntualidad: 89 }
    ]
  };

  const pieData = {
    attendance: [
      { label: "Presentes", value: 90, color: "#198754" },
      { label: "Ausentes", value: 7, color: "#dc3545" },
      { label: "Retrasados", value: 3, color: "#ffc107" }
    ],
    absence: [
      { label: "Enfermedad", value: 45, color: "#0d6efd" },
      { label: "Permiso", value: 30, color: "#20c997" },
      { label: "Sin Justificar", value: 25, color: "#dc3545" }
    ],
    punctuality: [
      { label: "A Tiempo", value: 92, color: "#198754" },
      { label: "Retrasados", value: 8, color: "#ffc107" }
    ],
    overtime: [
      { label: "Programado", value: 70, color: "#0d6efd" },
      { label: "No Programado", value: 30, color: "#fd7e14" }
    ],
    monthly: [
      { label: "Asistencia", value: 92, color: "#198754" },
      { label: "Ausencia", value: 8, color: "#dc3545" }
    ]
  };

  const tableData = {
    attendance: [
      { departamento: "TI", presentes: 25, ausentes: 2, retrasados: 1, tasa: 92 },
      { departamento: "RRHH", presentes: 12, ausentes: 1, retrasados: 0, tasa: 96 },
      { departamento: "Finanzas", presentes: 18, ausentes: 2, retrasados: 1, tasa: 90 },
      { departamento: "Ventas", presentes: 30, ausentes: 5, retrasados: 2, tasa: 86 },
      { departamento: "Marketing", presentes: 10, ausentes: 0, retrasados: 1, tasa: 98 }
    ],
    absence: [
      { departamento: "TI", enfermedad: 1, permiso: 1, sinJustificar: 0, total: 2 },
      { departamento: "RRHH", enfermedad: 0, permiso: 1, sinJustificar: 0, total: 1 },
      { departamento: "Finanzas", enfermedad: 2, permiso: 0, sinJustificar: 0, total: 2 },
      { departamento: "Ventas", enfermedad: 2, permiso: 1, sinJustificar: 2, total: 5 },
      { departamento: "Marketing", enfermedad: 0, permiso: 0, sinJustificar: 0, total: 0 }
    ]
  };

  // Función para renderizar el gráfico de barras apropiado según el tipo de reporte
  const renderChart = () => {
    const data = chartData[currentChart] || chartData.attendance;
    
    if (currentChart === "attendance") {
      return (
        <div className="bar-chart">
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="multi-bars">
                    <div 
                      className="bar presente" 
                      data-height={`${item.presente * 3}px`}
                      style={{ height: "0px" }}
                      title={`Presentes: ${item.presente}%`}
                    ></div>
                    <div 
                      className="bar ausente" 
                      data-height={`${item.ausente * 3}px`}
                      style={{ height: "0px" }}
                      title={`Ausentes: ${item.ausente}%`}
                    ></div>
                    <div 
                      className="bar retraso" 
                      data-height={`${item.retraso * 3}px`}
                      style={{ height: "0px" }}
                      title={`Retrasados: ${item.retraso}%`}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color presente"></div>
              <span>Presentes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color ausente"></div>
              <span>Ausentes</span>
            </div>
            <div className="legend-item">
              <div className="legend-color retraso"></div>
              <span>Retrasados</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentChart === "absence") {
      return (
        <div className="bar-chart">
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>10</span>
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="multi-bars">
                    <div 
                      className="bar enfermedad" 
                      data-height={`${item.enfermedad * 30}px`}
                      style={{ height: "0px" }}
                      title={`Enfermedad: ${item.enfermedad}`}
                    ></div>
                    <div 
                      className="bar permiso" 
                      data-height={`${item.permiso * 30}px`}
                      style={{ height: "0px" }}
                      title={`Permiso: ${item.permiso}`}
                    ></div>
                    <div 
                      className="bar sin-justificar" 
                      data-height={`${item.sinJustificar * 30}px`}
                      style={{ height: "0px" }}
                      title={`Sin Justificar: ${item.sinJustificar}`}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color enfermedad"></div>
              <span>Enfermedad</span>
            </div>
            <div className="legend-item">
              <div className="legend-color permiso"></div>
              <span>Permiso</span>
            </div>
            <div className="legend-item">
              <div className="legend-color sin-justificar"></div>
              <span>Sin Justificar</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentChart === "punctuality") {
      return (
        <div className="bar-chart">
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="multi-bars">
                    <div 
                      className="bar a-tiempo" 
                      data-height={`${item.aTiempo * 3}px`}
                      style={{ height: "0px" }}
                      title={`A Tiempo: ${item.aTiempo}%`}
                    ></div>
                    <div 
                      className="bar retraso" 
                      data-height={`${item.retraso * 3}px`}
                      style={{ height: "0px" }}
                      title={`Retrasados: ${item.retraso}%`}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color a-tiempo"></div>
              <span>A Tiempo</span>
            </div>
            <div className="legend-item">
              <div className="legend-color retraso"></div>
              <span>Retrasados</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentChart === "overtime") {
      return (
        <div className="bar-chart">
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>30h</span>
              <span>20h</span>
              <span>10h</span>
              <span>0h</span>
            </div>
            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="single-bar">
                    <div 
                      className="bar horas" 
                      data-height={`${item.horas * 12}px`}
                      style={{ height: "0px", width: "30px" }}
                      title={`Horas: ${item.horas}`}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color horas"></div>
              <span>Horas Extras</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentChart === "monthly") {
      return (
        <div className="bar-chart">
          <div className="chart-container">
            <div className="chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="chart-bars">
              {data.map((item, index) => (
                <div key={index} className="chart-bar-group">
                  <div className="multi-bars">
                    <div 
                      className="bar asistencia" 
                      data-height={`${item.asistencia * 3}px`}
                      style={{ height: "0px" }}
                      title={`Asistencia: ${item.asistencia}%`}
                    ></div>
                    <div 
                      className="bar ausencia" 
                      data-height={`${item.ausencia * 3}px`}
                      style={{ height: "0px" }}
                      title={`Ausencia: ${item.ausencia}%`}
                    ></div>
                    <div 
                      className="bar puntualidad" 
                      data-height={`${item.puntualidad * 3}px`}
                      style={{ height: "0px" }}
                      title={`Puntualidad: ${item.puntualidad}%`}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color asistencia"></div>
              <span>Asistencia</span>
            </div>
            <div className="legend-item">
              <div className="legend-color ausencia"></div>
              <span>Ausencia</span>
            </div>
            <div className="legend-item">
              <div className="legend-color puntualidad"></div>
              <span>Puntualidad</span>
            </div>
          </div>
        </div>
      );
    }
  };

  // Función para renderizar el gráfico de pie
  const renderPieChart = () => {
    const data = pieData[currentChart] || pieData.attendance;
    const total = data.reduce((acc, item) => acc + item.value, 0);
    
    return (
      <div className="pie-chart">
        <div className="pie-container">
          <div className="pie-chart-visual">
            {data.map((item, index) => {
              const previousAngles = data
                .slice(0, index)
                .reduce((sum, d) => sum + (d.value / total) * 360, 0);
              
              return (
                <div
                  key={index}
                  className="pie-slice animate-slice"
                  style={{
                    "--slice-start": previousAngles,
                    "--slice-angle": (item.value / total) * 360,
                    "--slice-color": item.color
                  }}
                ></div>
              );
            })}
            <div className="pie-center">
              <div className="pie-data">
                {currentChart === "attendance" ? "90% Asistencia" :
                 currentChart === "absence" ? "8% Ausencias" : 
                 currentChart === "punctuality" ? "92% Puntualidad" :
                 currentChart === "overtime" ? "120 Horas" :
                 "92% Promedio"}
              </div>
            </div>
          </div>
        </div>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }}></div>
              <span>{item.label}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Función para renderizar la tabla de datos
  const renderDataTable = () => {
    if (currentChart === "attendance") {
      return (
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Presentes</th>
                <th>Ausentes</th>
                <th>Retrasados</th>
                <th>Tasa de Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {tableData.attendance.map((item, index) => (
                <tr key={index} className="animate-row" style={{ "--row-delay": `${index * 0.1}s` }}>
                  <td>{item.departamento}</td>
                  <td>{item.presentes}</td>
                  <td>{item.ausentes}</td>
                  <td>{item.retrasados}</td>
                  <td>
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill animate-fill" 
                        style={{ 
                          width: `${item.tasa}%`,
                          "--fill-delay": `${0.5 + index * 0.1}s`
                        }}
                      ></div>
                      <span>{item.tasa}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>95</td>
                <td>10</td>
                <td>5</td>
                <td>
                  <div className="percentage-bar">
                    <div 
                      className="percentage-fill animate-fill" 
                      style={{ 
                        width: "91%",
                        "--fill-delay": "1s"
                      }}
                    ></div>
                    <span>91%</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    
    if (currentChart === "absence") {
      return (
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Departamento</th>
                <th>Enfermedad</th>
                <th>Permiso</th>
                <th>Sin Justificar</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.absence.map((item, index) => (
                <tr key={index} className="animate-row" style={{ "--row-delay": `${index * 0.1}s` }}>
                  <td>{item.departamento}</td>
                  <td>{item.enfermedad}</td>
                  <td>{item.permiso}</td>
                  <td>{item.sinJustificar}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>5</td>
                <td>3</td>
                <td>2</td>
                <td>10</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    
    // Más tablas para otros tipos de reportes...
    return (
      <div className="report-table">
        <p className="no-data">Seleccione un tipo de reporte para ver los datos detallados.</p>
      </div>
    );
  };

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Reportes</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar reporte..."
              className="search-input"
            />
          </div>
        </div>

        <div className="report-control-panel">
          <div className="report-selector">
            <h3>Tipo de Reporte</h3>
            <div className="report-options">
              {reportTypes.map((type) => (
                <div
                  key={type.id}
                  className={`report-option ${filters.reportType === type.id ? 'active' : ''}`}
                  onClick={() => handleReportTypeChange(type.id)}
                >
                  <div className="report-icon">{type.icon}</div>
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="report-filter-row">
            <div className="date-filter">
              <h3>Período</h3>
              <div className="date-options">
                <div
                  className={`date-option ${dateType === 'today' ? 'active' : ''}`}
                  onClick={() => handleDateTypeChange('today')}
                >
                  <FaCalendarAlt /> Hoy
                </div>
                <div
                  className={`date-option ${dateType === 'week' ? 'active' : ''}`}
                  onClick={() => handleDateTypeChange('week')}
                >
                  <FaCalendarAlt /> Esta Semana
                </div>
                <div
                  className={`date-option ${dateType === 'month' ? 'active' : ''}`}
                  onClick={() => handleDateTypeChange('month')}
                >
                  <FaCalendarAlt /> Este Mes
                </div>
                <div
                  className={`date-option ${dateType === 'custom' ? 'active' : ''}`}
                  onClick={() => handleDateTypeChange('custom')}
                >
                  <FaCalendarAlt /> Personalizado
                </div>
              </div>
              
              {dateType === 'custom' && (
                <div className="custom-date-range">
                  <div className="date-input-group">
                    <label>Desde:</label>
                    <input
                      type="date"
                      name="startDate"
                      value={customDateRange.startDate}
                      onChange={handleCustomDateChange}
                    />
                  </div>
                  <div className="date-input-group">
                    <label>Hasta:</label>
                    <input
                      type="date"
                      name="endDate"
                      value={customDateRange.endDate}
                      onChange={handleCustomDateChange}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="entity-filters">
              <div className={`filter-accordeon ${expandedFilter === 'sucursal' ? 'expanded' : ''}`}>
                <div className="filter-header" onClick={() => handleExpandFilter('sucursal')}>
                  <span>Sucursal</span>
                  {expandedFilter === 'sucursal' ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {expandedFilter === 'sucursal' && (
                  <div className="filter-content">
                    <select
                      name="sucursal"
                      value={filters.sucursal}
                      onChange={handleFilterChange}
                      disabled={userInfo.role === "Operator"}
                    >
                      <option value="all">Todas</option>
                      {sucursales.map((sucursal) => (
                        <option key={sucursal} value={sucursal}>{sucursal}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className={`filter-accordeon ${expandedFilter === 'departamento' ? 'expanded' : ''}`}>
                <div className="filter-header" onClick={() => handleExpandFilter('departamento')}>
                  <span>Departamento</span>
                  {expandedFilter === 'departamento' ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {expandedFilter === 'departamento' && (
                  <div className="filter-content">
                    <select
                      name="departamento"
                      value={filters.departamento}
                      onChange={handleFilterChange}
                    >
                      <option value="all">Todos</option>
                      {departamentos.map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className={`filter-accordeon ${expandedFilter === 'cargo' ? 'expanded' : ''}`}>
                <div className="filter-header" onClick={() => handleExpandFilter('cargo')}>
                  <span>Cargo</span>
                  {expandedFilter === 'cargo' ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {expandedFilter === 'cargo' && (
                  <div className="filter-content">
                    <select
                      name="cargo"
                      value={filters.cargo}
                      onChange={handleFilterChange}
                    >
                      <option value="all">Todos</option>
                      {cargos.map((cargo) => (
                        <option key={cargo} value={cargo}>{cargo}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className={`filter-accordeon ${expandedFilter === 'empleado' ? 'expanded' : ''}`}>
                <div className="filter-header" onClick={() => handleExpandFilter('empleado')}>
                  <span>Empleado</span>
                  {expandedFilter === 'empleado' ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {expandedFilter === 'empleado' && (
                  <div className="filter-content">
                    <select
                      name="empleado"
                      value={filters.empleado}
                      onChange={handleFilterChange}
                    >
                      <option value="all">Todos</option>
                      {empleados.map((emp) => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className={`filter-accordeon ${expandedFilter === 'estado' ? 'expanded' : ''}`}>
                <div className="filter-header" onClick={() => handleExpandFilter('estado')}>
                  <span>Estado</span>
                  {expandedFilter === 'estado' ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {expandedFilter === 'estado' && (
                  <div className="filter-content">
                    <select
                      name="estado"
                      value={filters.estado}
                      onChange={handleFilterChange}
                    >
                      <option value="all">Todos</option>
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="licencia">De Licencia</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="report-actions">
            <div className="view-toggle">
              <button
                className={`view-btn ${displayView === 'chart' ? 'active' : ''}`}
                onClick={() => setDisplayView('chart')}
              >
                <FaChartBar /> Barras
              </button>
              <button
                className={`view-btn ${displayView === 'pie' ? 'active' : ''}`}
                onClick={() => setDisplayView('pie')}
              >
                <FaChartPie /> Torta
              </button>
              <button
                className={`view-btn ${displayView === 'table' ? 'active' : ''}`}
                onClick={() => setDisplayView('table')}
              >
                <FaTable /> Tabla
              </button>
            </div>
            
            <div className="export-actions">
              <button
                className="export-btn"
                onClick={() => handleExportReport('pdf')}
              >
                <FaFilePdf /> PDF
              </button>
              <button
                className="export-btn"
                onClick={() => handleExportReport('excel')}
              >
                <FaFileExcel /> Excel
              </button>
              <button
                className="print-btn"
                onClick={handlePrintReport}
              >
                <FaPrint /> Imprimir
              </button>
              <button
                className="share-btn"
                onClick={handleShareReport}
              >
                <FaShareAlt /> Compartir
              </button>
              <button
                className="btn-generate"
                onClick={handleGenerateReport}
                disabled={isLoading}
              >
                {isLoading ? <><FaSync className="spin" /> Generando...</> : <><FaFileAlt /> Generar Reporte</>}
              </button>
            </div>
          </div>
        </div>

        <div className="report-container">
          <div className="report-header">
            <h2>
              {currentChart === "attendance" ? "Reporte de Asistencia" :
               currentChart === "absence" ? "Reporte de Ausencias" :
               currentChart === "punctuality" ? "Reporte de Puntualidad" :
               currentChart === "overtime" ? "Reporte de Horas Extras" :
               "Reporte Mensual"}
            </h2>
            <div className="report-period">
              <FaCalendarAlt /> 
              {dateType === 'today' ? 'Hoy, 30 Abril 2025' :
               dateType === 'week' ? 'Semana del 24 al 30 de Abril, 2025' :
               dateType === 'month' ? 'Abril 2025' :
               `${customDateRange.startDate} a ${customDateRange.endDate}`}
            </div>
            <div className="report-filters-active">
              <FaFilter /> 
              {filters.sucursal === 'all' ? 'Todas las sucursales' : `Sucursal: ${filters.sucursal}`}
              {filters.departamento !== 'all' && `, Departamento: ${filters.departamento}`}
              {filters.cargo !== 'all' && `, Cargo: ${filters.cargo}`}
              {filters.empleado !== 'all' && `, Empleado: ${filters.empleado}`}
              {filters.estado !== 'all' && `, Estado: ${filters.estado}`}
            </div>
          </div>
          
          <div className="report-content">
            {displayView === 'chart' && renderChart()}
            {displayView === 'pie' && renderPieChart()}
            {displayView === 'table' && renderDataTable()}
          </div>
        </div>

        <div className="recent-reports">
          <div className="section-header">
            <h2>Reportes Recientes</h2>
            <div className="sort-controls">
              <span>Ordenar por:</span>
              <button 
                className={filters.sortBy === 'date' ? 'active' : ''}
                onClick={() => handleSortChange('date')}
              >
                Fecha {filters.sortBy === 'date' && (filters.sortDirection === 'asc' ? <FaAngleUp /> : <FaAngleDown />)}
              </button>
              <button 
                className={filters.sortBy === 'type' ? 'active' : ''}
                onClick={() => handleSortChange('type')}
              >
                Tipo {filters.sortBy === 'type' && (filters.sortDirection === 'asc' ? <FaAngleUp /> : <FaAngleDown />)}
              </button>
            </div>
          </div>
          <div className="table-container reports-table">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSortChange('id')}>ID</th>
                    <th onClick={() => handleSortChange('type')}>Tipo</th>
                    <th onClick={() => handleSortChange('date')}>Fecha</th>
                    <th onClick={() => handleSortChange('sucursal')}>Sucursal</th>
                    <th onClick={() => handleSortChange('departamento')}>Departamento</th>
                    <th>Resumen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="animate-row">
                        <td>{report.id}</td>
                        <td>
                          <span className={`report-type ${report.type}`}>
                            {report.type === "attendance" ? "Asistencia" :
                             report.type === "absence" ? "Ausencias" :
                             report.type === "punctuality" ? "Puntualidad" :
                             report.type === "overtime" ? "Horas Extras" :
                             "Mensual"}
                          </span>
                        </td>
                        <td>{report.date}</td>
                        <td>{report.sucursal}</td>
                        <td>{report.departamento}</td>
                        <td>{report.summary}</td>
                        <td className="actions">
                          <button
                            className="btn-preview"
                            onClick={() => setCurrentChart(report.type)}
                            title="Vista previa"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn-download"
                            onClick={() => handleDownloadReport(report.id, 'pdf')}
                            title="Descargar PDF"
                          >
                            <FaFilePdf />
                          </button>
                          <button
                            className="btn-excel"
                            onClick={() => handleDownloadReport(report.id, 'excel')}
                            title="Descargar Excel"
                          >
                            <FaFileExcel />
                          </button>
                          <button
                            className="btn-share"
                            onClick={() => handleShareReport(report.id)}
                            title="Compartir"
                          >
                            <FaEnvelope />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No se encontraron reportes</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportes;