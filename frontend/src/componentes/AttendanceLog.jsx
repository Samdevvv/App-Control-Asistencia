import React, { useState, useContext } from "react";
import "../estilos/AttendanceLog.css";
import { FaFingerprint, FaSearch } from "react-icons/fa";
import { ModalContext } from "./ModalManager"; // Updated import path

function RegistroDeEntrada({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceLogs, setAttendanceLogs] = useState([
    { id: 1, employee: "Juan Pérez", date: "2025-04-20", entryTime: "08:02", exitTime: "17:05", sucursal: "Principal" },
    { id: 2, employee: "María González", date: "2025-04-20", entryTime: "08:10", exitTime: "", sucursal: "Sucursal A" },
    { id: 3, employee: "Carlos Rodríguez", date: "2025-04-20", entryTime: "07:55", exitTime: "16:50", sucursal: "Sucursal B" },
  ]);

  const handleFingerprintLog = (employeeId, action) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const date = now.toISOString().split("T")[0];
    const employee = attendanceLogs.find((log) => log.employee === employeeId) || { employee: employeeId, sucursal: userInfo.sucursal };

    if (action === "entry") {
      setAttendanceLogs([
        ...attendanceLogs,
        { id: attendanceLogs.length + 1, employee: employeeId, date, entryTime: time, exitTime: "", sucursal: userInfo.sucursal },
      ]);
      showModal("success", `Entry logged for ${employeeId} at ${time}`);
    } else {
      setAttendanceLogs(
        attendanceLogs.map((log) =>
          log.employee === employeeId && log.date === date && !log.exitTime
            ? { ...log, exitTime: time }
            : log
        )
      );
      showModal("success", `Exit logged for ${employeeId} at ${time}`);
    }
  };

  const filteredLogs = attendanceLogs.filter(
    (log) =>
      (userInfo.role === "Admin" ||
        (userInfo.role === "Supervisor" && log.sucursal === userInfo.region) ||
        (userInfo.role === "Operator" && log.sucursal === userInfo.sucursal)) &&
      (log.employee.toLowerCase().includes(searchTerm.toLowerCase()) || log.date.includes(searchTerm))
  );

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Registro De Entrada</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Entry Time</th>
                  <th>Exit Time</th>
                  <th>Sucursal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.employee}</td>
                      <td>{log.date}</td>
                      <td>{log.entryTime}</td>
                      <td>{log.exitTime}</td>
                      <td>{log.sucursal}</td>
                      <td className="actions">
                        {!log.entryTime && (
                          <button
                            className="btn-fingerprint"
                            onClick={() => handleFingerprintLog(log.employee, "entry")}
                          >
                            <FaFingerprint /> Log Entry
                          </button>
                        )}
                        {log.entryTime && !log.exitTime && (
                          <button
                            className="btn-fingerprint"
                            onClick={() => handleFingerprintLog(log.employee, "exit")}
                          >
                            <FaFingerprint /> Log Exit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No attendance logs found</td>
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

export default RegistroDeEntrada;