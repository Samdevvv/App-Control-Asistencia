import React, { useState, useContext } from "react";
import "../estilos/Reportes.css";
import {
  FaFileAlt,
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";
import { ModalContext } from "./ModalManager"; // Replace ../contexts/ModalContext

function Reportes({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [filters, setFilters] = useState({
    dateRange: "month",
    sucursal: userInfo.role === "Operator" ? userInfo.sucursal : "all",
    departamento: "all",
    reportType: "attendance",
  });
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Attendance",
      date: "2025-04-20",
      sucursal: "Principal",
      departamento: "TI",
      summary: "90% attendance rate",
    },
    {
      id: 2,
      type: "Absence",
      date: "2025-04-20",
      sucursal: "Sucursal A",
      departamento: "RRHH",
      summary: "5 employees absent",
    },
    {
      id: 3,
      type: "Punctuality",
      date: "2025-04-20",
      sucursal: "Sucursal B",
      departamento: "Finanzas",
      summary: "95% on-time arrivals",
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerateReport = () => {
    showModal("success", "Report generated successfully!");
  };

  const handleDownloadReport = (id) => {
    showModal("success", `Downloading report ${id}...`);
  };

  const filteredReports = reports.filter(
    (report) =>
      (userInfo.role === "Admin" ||
        (userInfo.role === "Supervisor" && report.sucursal === userInfo.region) ||
        (userInfo.role === "Operator" && report.sucursal === userInfo.sucursal)) &&
      (filters.reportType === "all" || report.type.toLowerCase() === filters.reportType) &&
      (filters.sucursal === "all" || report.sucursal === filters.sucursal) &&
      (filters.departamento === "all" || report.departamento === filters.departamento)
  );

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Reportes</h1>
          <div className="filter-container">
            <FaFilter className="filter-icon" />
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleFilterChange}
            >
              <option value="all">Todos los Reportes</option>
              <option value="attendance">Asistencia</option>
              <option value="absence">Ausencias</option>
              <option value="punctuality">Puntualidad</option>
            </select>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            <label>Rango de Fecha:</label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
            >
              <option value="today">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
            </select>
          </div>
          {userInfo.role !== "Operator" && (
            <div className="filter-group">
              <label>Sucursal:</label>
              <select
                name="sucursal"
                value={filters.sucursal}
                onChange={handleFilterChange}
              >
                <option value="all">Todas</option>
                <option value="Principal">Principal</option>
                <option value="Sucursal A">Sucursal A</option>
                <option value="Sucursal B">Sucursal B</option>
              </select>
            </div>
          )}
          <div className="filter-group">
            <label>Departamento:</label>
            <select
              name="departamento"
              value={filters.departamento}
              onChange={handleFilterChange}
            >
              <option value="all">Todos</option>
              <option value="TI">TI</option>
              <option value="RRHH">RRHH</option>
              <option value="Finanzas">Finanzas</option>
            </select>
          </div>
          <button
            className="btn-generate"
            onClick={handleGenerateReport}
          >
            <FaFileAlt /> Generar Reporte
          </button>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Sucursal</th>
                  <th>Departamento</th>
                  <th>Resumen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.type}</td>
                      <td>{report.date}</td>
                      <td>{report.sucursal}</td>
                      <td>{report.departamento}</td>
                      <td>{report.summary}</td>
                      <td className="actions">
                        <button
                          className="btn-download"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <FaDownload />
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
  );
}

export default Reportes;