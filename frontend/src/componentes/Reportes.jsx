import React, { useState } from "react";
import "../estilos/Reportes.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaCalendarAlt, FaFilter, FaDownload, FaPrint, FaChartBar, FaChartPie, FaTable } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp, MdDateRange } from "react-icons/md";


function ModuloReportes({ onNavigate, onLogout, activeModule }) {
  // Estados para filtros de reportes
  const [reportType, setReportType] = useState("asistencia");
  const [dateRange, setDateRange] = useState("semana");
  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: ""
  });
  const [viewMode, setViewMode] = useState("grafico");
  const [filterSucursal, setFilterSucursal] = useState("");
  const [filterDepartamento, setFilterDepartamento] = useState("");

  // Datos de ejemplo para las gráficas
  const attendanceData = [
    { dia: "Lunes", asistencias: 142, ausencias: 3, tardanzas: 8 },
    { dia: "Martes", asistencias: 138, ausencias: 7, tardanzas: 5 },
    { dia: "Miércoles", asistencias: 145, ausencias: 0, tardanzas: 9 },
    { dia: "Jueves", asistencias: 140, ausencias: 5, tardanzas: 6 },
    { dia: "Viernes", asistencias: 135, ausencias: 10, tardanzas: 4 }
  ];

  // Lista de sucursales y departamentos
  const sucursales = ["Todas", "Sucursal Principal", "Sucursal Este", "Sucursal Oeste", "Sucursal Norte", "Sucursal Sur"];
  const departamentos = ["Todos", "Administración", "Ventas", "Marketing", "Finanzas", "RRHH", "TI", "Operaciones"];

  // Función para generar fechas de ejemplo basadas en el rango seleccionado
  const getDateRangeText = () => {
    const today = new Date();
    
    switch (dateRange) {
      case "hoy":
        return `${today.toLocaleDateString()}`;
      case "semana":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
      case "mes":
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();
        return `${month} ${year}`;
      case "personalizado":
        if (!customRange.startDate || !customRange.endDate) return "Seleccione un rango";
        return `${customRange.startDate} - ${customRange.endDate}`;
      default:
        return "Rango de fechas";
    }
  };

  // Función para cambiar entre tipos de reportes
  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  // Función para cambiar rango de fechas
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // Función para cambiar entre modos de visualización
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Función para exportar reporte
  const handleExport = (format) => {
    console.log("Exportando reporte en formato:", format);
    // Aquí iría la lógica para exportar
  };

  // Función para imprimir reporte
  const handlePrint = () => {
    console.log("Imprimiendo reporte");
    // Aquí iría la lógica para imprimir
  };

  return (
    <div className="modulo-container">
     

      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Reportes y Estadísticas</h1>
        </div>

        {/* Panel de control de reportes */}
        <div className="report-control-panel">
          <div className="report-selector">
            <h3>Tipo de Reporte</h3>
            <div className="report-options">
              <button 
                className={`report-option ${reportType === "asistencia" ? "active" : ""}`}
                onClick={() => handleReportTypeChange("asistencia")}
              >
                <FaUsers className="report-icon" />
                <span>Asistencia</span>
              </button>
              <button 
                className={`report-option ${reportType === "puntualidad" ? "active" : ""}`}
                onClick={() => handleReportTypeChange("puntualidad")}
              >
                <FaCalendarAlt className="report-icon" />
                <span>Puntualidad</span>
              </button>
              <button 
                className={`report-option ${reportType === "ausencias" ? "active" : ""}`}
                onClick={() => handleReportTypeChange("ausencias")}
              >
                <FaUserAlt className="report-icon" />
                <span>Ausencias</span>
              </button>
              <button 
                className={`report-option ${reportType === "sucursales" ? "active" : ""}`}
                onClick={() => handleReportTypeChange("sucursales")}
              >
                <FaBuilding className="report-icon" />
                <span>Sucursales</span>
              </button>
            </div>
          </div>
          
          <div className="report-filter-row">
            <div className="date-filter">
              <h3>Periodo</h3>
              <div className="date-options">
                <button 
                  className={`date-option ${dateRange === "hoy" ? "active" : ""}`}
                  onClick={() => handleDateRangeChange("hoy")}
                >
                  Hoy
                </button>
                <button 
                  className={`date-option ${dateRange === "semana" ? "active" : ""}`}
                  onClick={() => handleDateRangeChange("semana")}
                >
                  Esta Semana
                </button>
                <button 
                  className={`date-option ${dateRange === "mes" ? "active" : ""}`}
                  onClick={() => handleDateRangeChange("mes")}
                >
                  Este Mes
                </button>
                <button 
                  className={`date-option ${dateRange === "personalizado" ? "active" : ""}`}
                  onClick={() => handleDateRangeChange("personalizado")}
                >
                  Personalizado
                </button>
              </div>
              
              {dateRange === "personalizado" && (
                <div className="custom-date-range">
                  <div className="date-input-group">
                    <label>Desde:</label>
                    <input 
                      type="date" 
                      value={customRange.startDate}
                      onChange={(e) => setCustomRange({...customRange, startDate: e.target.value})}
                    />
                  </div>
                  <div className="date-input-group">
                    <label>Hasta:</label>
                    <input 
                      type="date" 
                      value={customRange.endDate}
                      onChange={(e) => setCustomRange({...customRange, endDate: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="entity-filters">
              <div className="filter-group">
                <label>Sucursal:</label>
                <select
                  value={filterSucursal}
                  onChange={(e) => setFilterSucursal(e.target.value)}
                >
                  {sucursales.map((sucursal, index) => (
                    <option key={index} value={sucursal === "Todas" ? "" : sucursal}>
                      {sucursal}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Departamento:</label>
                <select
                  value={filterDepartamento}
                  onChange={(e) => setFilterDepartamento(e.target.value)}
                >
                  {departamentos.map((depto, index) => (
                    <option key={index} value={depto === "Todos" ? "" : depto}>
                      {depto}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="report-actions">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === "grafico" ? "active" : ""}`}
                onClick={() => handleViewModeChange("grafico")}
              >
                <FaChartBar />
                <span>Gráfico</span>
              </button>
              <button 
                className={`view-btn ${viewMode === "torta" ? "active" : ""}`}
                onClick={() => handleViewModeChange("torta")}
              >
                <FaChartPie />
                <span>Torta</span>
              </button>
              <button 
                className={`view-btn ${viewMode === "tabla" ? "active" : ""}`}
                onClick={() => handleViewModeChange("tabla")}
              >
                <FaTable />
                <span>Tabla</span>
              </button>
            </div>
            
            <div className="export-actions">
              <button className="export-btn" onClick={() => handleExport("excel")}>
                <FaDownload />
                <span>Excel</span>
              </button>
              <button className="export-btn" onClick={() => handleExport("pdf")}>
                <FaDownload />
                <span>PDF</span>
              </button>
              <button className="print-btn" onClick={handlePrint}>
                <FaPrint />
                <span>Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido del reporte */}
        <div className="report-container">
          <div className="report-header">
            <h2>
              {reportType === "asistencia" && "Reporte de Asistencia"}
              {reportType === "puntualidad" && "Reporte de Puntualidad"}
              {reportType === "ausencias" && "Reporte de Ausencias"}
              {reportType === "sucursales" && "Reporte por Sucursales"}
            </h2>
            <div className="report-period">
              <MdDateRange />
              <span>{getDateRangeText()}</span>
            </div>
            
            <div className="report-filters-active">
              <FaFilter />
              <span>
                {filterSucursal ? `Sucursal: ${filterSucursal} | ` : ""}
                {filterDepartamento ? `Departamento: ${filterDepartamento}` : ""}
                {!filterSucursal && !filterDepartamento && "Sin filtros aplicados"}
              </span>
            </div>
          </div>
          
          <div className="report-content">
            {viewMode === "grafico" && (
              <div className="report-chart bar-chart">
                <div className="chart-container">
                  <div className="chart-y-axis">
                    <span>150</span>
                    <span>120</span>
                    <span>90</span>
                    <span>60</span>
                    <span>30</span>
                    <span>0</span>
                  </div>
                  <div className="chart-bars">
                    {attendanceData.map((item, index) => (
                      <div className="chart-bar-group" key={index}>
                        <div className="multi-bars">
                          <div 
                            className="bar asistencias"
                            style={{ height: `${(item.asistencias / 150) * 100}%` }}
                            title={`Asistencias: ${item.asistencias}`}
                          ></div>
                          <div 
                            className="bar ausencias"
                            style={{ height: `${(item.ausencias / 150) * 100}%` }}
                            title={`Ausencias: ${item.ausencias}`}
                          ></div>
                          <div 
                            className="bar tardanzas"
                            style={{ height: `${(item.tardanzas / 150) * 100}%` }}
                            title={`Tardanzas: ${item.tardanzas}`}
                          ></div>
                        </div>
                        <div className="chart-bar-label">{item.dia}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color asistencias"></div>
                    <span>Asistencias</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color ausencias"></div>
                    <span>Ausencias</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color tardanzas"></div>
                    <span>Tardanzas</span>
                  </div>
                </div>
              </div>
            )}
            
            {viewMode === "torta" && (
              <div className="report-chart pie-chart">
                <div className="pie-container">
                  <div className="pie-chart-visual">
                    <div className="pie-slice" style={{ 
                      '--percentage': '92', 
                      '--color': '#198754',
                      '--start-angle': '0' 
                    }}></div>
                    <div className="pie-slice" style={{ 
                      '--percentage': '3', 
                      '--color': '#dc3545',
                      '--start-angle': '331.2' 
                    }}></div>
                    <div className="pie-slice" style={{ 
                      '--percentage': '5', 
                      '--color': '#ffc107',
                      '--start-angle': '342' 
                    }}></div>
                    <div className="pie-center">
                      <span>Total: 150</span>
                    </div>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color asistencias"></div>
                    <span>Asistencias (92%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color ausencias"></div>
                    <span>Ausencias (3%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color tardanzas"></div>
                    <span>Tardanzas (5%)</span>
                  </div>
                </div>
              </div>
            )}
            
            {viewMode === "tabla" && (
              <div className="report-table">
                <table>
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Asistencias</th>
                      <th>Ausencias</th>
                      <th>Tardanzas</th>
                      <th>Total</th>
                      <th>% Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((item, index) => {
                      const total = item.asistencias + item.ausencias + item.tardanzas;
                      const porcentajeAsistencia = ((item.asistencias / total) * 100).toFixed(1);
                      
                      return (
                        <tr key={index}>
                          <td>{item.dia}</td>
                          <td>{item.asistencias}</td>
                          <td>{item.ausencias}</td>
                          <td>{item.tardanzas}</td>
                          <td>{total}</td>
                          <td>
                            <div className="percentage-bar">
                              <div 
                                className="percentage-fill"
                                style={{ width: `${porcentajeAsistencia}%` }}
                              ></div>
                              <span>{porcentajeAsistencia}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>700</strong></td>
                      <td><strong>25</strong></td>
                      <td><strong>32</strong></td>
                      <td><strong>757</strong></td>
                      <td>
                        <div className="percentage-bar">
                          <div 
                            className="percentage-fill"
                            style={{ width: '92.5%' }}
                          ></div>
                          <span>92.5%</span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default ModuloReportes;