import React, { useState, useContext } from "react";
import "../estilos/ScheduleManagement.css";
import { FaCalendarAlt, FaClock, FaPlusCircle, FaEdit, FaTrash, FaSearch } from "react-icons/fa"; // Added FaSearch
import { ModalContext } from "./ModalManager";

function ScheduleManagement({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    employeeId: "",
    entryTime: "08:00",
    exitTime: "17:00",
    holidayDate: "",
    vacationStart: "",
    vacationEnd: "",
    leaveDate: "",
    leaveReason: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [schedules, setSchedules] = useState([
    { id: 1, employee: "Juan Pérez", entryTime: "08:00", exitTime: "17:00", type: "Daily Schedule", sucursal: "Principal" },
    { id: 2, employee: "All", holidayDate: "2025-12-25", type: "Holiday", sucursal: "All" },
    { id: 3, employee: "María González", leaveDate: "2025-05-10", leaveReason: "Medical", type: "Leave", sucursal: "Sucursal A" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: isEditing ? currentScheduleId : schedules.length + 1,
      employee: formData.employeeId || "All",
      ...formData,
      type: formData.holidayDate ? "Holiday" : formData.leaveDate ? "Leave" : "Daily Schedule",
      sucursal: userInfo.role === "Operator" ? userInfo.sucursal : "All",
    };
    if (isEditing) {
      setSchedules(schedules.map((sched) => (sched.id === currentScheduleId ? newSchedule : sched)));
      showModal("success", "Schedule updated successfully!");
    } else {
      setSchedules([...schedules, newSchedule]);
      showModal("success", "Schedule added successfully!");
    }
    setShowFormModal(false);
    setFormData({ employeeId: "", entryTime: "08:00", exitTime: "17:00", holidayDate: "", vacationStart: "", vacationEnd: "", leaveDate: "", leaveReason: "" });
    setIsEditing(false);
    setCurrentScheduleId(null);
  };

  const handleEdit = (schedule) => {
    setFormData({
      employeeId: schedule.employee !== "All" ? schedule.employee : "",
      entryTime: schedule.entryTime || "08:00",
      exitTime: schedule.exitTime || "17:00",
      holidayDate: schedule.holidayDate || "",
      vacationStart: schedule.vacationStart || "",
      vacationEnd: schedule.vacationEnd || "",
      leaveDate: schedule.leaveDate || "",
      leaveReason: schedule.leaveReason || "",
    });
    setIsEditing(true);
    setCurrentScheduleId(schedule.id);
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    showModal("confirmation", "Are you sure you want to delete this schedule?", () => {
      setSchedules(schedules.filter((sched) => sched.id !== id));
      showModal("success", "Schedule deleted successfully!");
    });
  };

  const filteredSchedules = schedules.filter(
    (sched) =>
      (userInfo.role === "Admin" ||
        (userInfo.role === "Supervisor" && sched.sucursal === userInfo.region) ||
        (userInfo.role === "Operator" && sched.sucursal === userInfo.sucursal)) &&
      (sched.employee.toLowerCase().includes(searchTerm.toLowerCase()) || sched.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Schedule Management</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-header">
          <h2>Schedule List</h2>
          <button className="btn-add" onClick={() => setShowFormModal(true)}>
            <FaPlusCircle className="add-icon" />
            Add Schedule
          </button>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Sucursal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((sched) => (
                    <tr key={sched.id}>
                      <td>{sched.id}</td>
                      <td>{sched.employee}</td>
                      <td>{sched.type}</td>
                      <td>
                        {sched.type === "Daily Schedule" && `${sched.entryTime} - ${sched.exitTime}`}
                        {sched.type === "Holiday" && sched.holidayDate}
                        {sched.type === "Leave" && `${sched.leaveDate} (${sched.leaveReason})`}
                      </td>
                      <td>{sched.sucursal}</td>
                      <td className="actions">
                        <button className="btn-edit" onClick={() => handleEdit(sched)}>
                          <FaEdit />
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(sched.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No schedules found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showFormModal && (
          <div className="modal-overlay">
            <div className="form-modal">
              <div className="form-header">
                <h2>{isEditing ? "Edit Schedule" : "New Schedule"}</h2>
                <FaPlusCircle className="add-icon" />
              </div>
              <form className="modulo-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employeeId">Employee (Optional)</label>
                    <input
                      type="text"
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      placeholder="Leave blank for all employees"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="entryTime">Entry Time</label>
                    <input
                      type="time"
                      id="entryTime"
                      name="entryTime"
                      value={formData.entryTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exitTime">Exit Time</label>
                    <input
                      type="time"
                      id="exitTime"
                      name="exitTime"
                      value={formData.exitTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="holidayDate">Holiday Date</label>
                    <input
                      type="date"
                      id="holidayDate"
                      name="holidayDate"
                      value={formData.holidayDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vacationStart">Vacation Start</label>
                    <input
                      type="date"
                      id="vacationStart"
                      name="vacationStart"
                      value={formData.vacationStart}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vacationEnd">Vacation End</label>
                    <input
                      type="date"
                      id="vacationEnd"
                      name="vacationEnd"
                      value={formData.vacationEnd}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="leaveDate">Leave Date</label>
                    <input
                      type="date"
                      id="leaveDate"
                      name="leaveDate"
                      value={formData.leaveDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="leaveReason">Leave Reason</label>
                    <input
                      type="text"
                      id="leaveReason"
                      name="leaveReason"
                      value={formData.leaveReason}
                      onChange={handleChange}
                      placeholder="e.g., Medical, Personal"
                    />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="submit" className="btn-submit">
                    {isEditing ? "Update Schedule" : "Add Schedule"}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setShowFormModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleManagement;