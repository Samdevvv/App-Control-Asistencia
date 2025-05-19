import React, { useState, useContext, useEffect, useMemo } from "react";
import "../estilos/ScheduleManagement.css";
import { 
  FaCalendarAlt, FaClock, FaPlusCircle, FaEdit, FaTrash, FaSearch, 
  FaUser, FaCalendarCheck, FaCalendarTimes, FaCalendarDay, 
  FaUsers, FaChevronLeft, FaChevronRight, FaRegListAlt,
  FaIdCard
} from "react-icons/fa";
import { ModalContext } from "./ModalManager";

function ScheduleManagement({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  
  // Estado para los tipos de horario y ausencia 
  const scheduleTypes = [
    { id: 1, name: "Horario Regular", color: "#0d6efd", icon: "clock" },
    { id: 2, name: "Turno", color: "#009688", icon: "clock" }
  ];
  
  const absenceTypes = [
    { id: 1, name: "Vacaciones", color: "#4caf50", icon: "vacation" },
    { id: 2, name: "Permiso Médico", color: "#f44336", icon: "medical" },
    { id: 3, name: "Permiso Personal", color: "#ff9800", icon: "personal" },
    { id: 4, name: "Día Festivo", color: "#2196f3", icon: "holiday" }
  ];
  
  // Estado para la vista activa
  const [activeView, setActiveView] = useState("horarios"); // "horarios" o "ausencias"
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    // Datos comunes
    employeeId: "",
    applyToAll: false,
    
    // Datos para horarios regulares
    scheduleType: "Horario Regular",
    startDate: "",
    endDate: "",
    daysOfWeek: [1, 2, 3, 4, 5], // [0, 1, 2, 3, 4, 5, 6] donde 0 = Domingo
    entryTime: "08:00",
    exitTime: "17:00",
    
    // Datos para ausencias
    absenceType: "Permiso Médico",
    absenceReason: "",
    absenceStart: "",
    absenceEnd: "",
    
    // Datos adicionales
    notes: ""
  });
  
  // Estado para controlar el modo de edición y modal
  const [isEditing, setIsEditing] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para vista en calendario
  const [calendarView, setCalendarView] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Estado para empleados (simulado)
  const [employees, setEmployees] = useState([
    { id: 1, name: "Juan Pérez", dni: "12345678A", department: "TI" },
    { id: 2, name: "María González", dni: "87654321B", department: "RRHH" },
    { id: 3, name: "Carlos Rodríguez", dni: "23456789C", department: "TI" },
    { id: 4, name: "Ana Martínez", dni: "34567890D", department: "Finanzas" },
    { id: 5, name: "Luis Sánchez", dni: "45678901E", department: "Marketing" }
  ]);
  
  // Estado para filtro de búsqueda de empleados
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  
  // Estado para animaciones
  const [animatedItemId, setAnimatedItemId] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState(""); // "add", "edit", "delete"
  
  // Estado para horarios y ausencias
  const [schedules, setSchedules] = useState([
    { 
      id: 1, 
      type: "Horario Regular", 
      scheduleType: "Horario Regular",
      employee: "Juan Pérez",
      employeeDni: "12345678A", 
      startDate: "2025-05-01",
      endDate: "2025-12-31",
      daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
      entryTime: "08:00", 
      exitTime: "17:00", 
      sucursal: "Principal" 
    },
    { 
      id: 2, 
      type: "Ausencia", 
      absenceType: "Día Festivo",
      description: "Día de la Independencia",
      absenceStart: "2025-07-05",
      absenceEnd: "2025-07-05",
      employee: "Todos", 
      sucursal: "Todas",
      applyToAll: true
    },
    { 
      id: 3, 
      type: "Ausencia", 
      absenceType: "Permiso Médico",
      absenceReason: "Consulta médica programada",
      absenceStart: "2025-05-10",
      absenceEnd: "2025-05-10",
      employee: "María González",
      employeeDni: "87654321B", 
      sucursal: "Sucursal A" 
    },
    {
      id: 4,
      type: "Horario Regular",
      scheduleType: "Turno",
      employee: "Luis Sánchez",
      employeeDni: "45678901E",
      startDate: "2025-05-01",
      endDate: "2025-06-30",
      daysOfWeek: [1, 2, 3, 4, 5],
      entryTime: "14:00",
      exitTime: "22:00",
      sucursal: "Sucursal B"
    },
    {
      id: 5,
      type: "Ausencia",
      absenceType: "Vacaciones",
      absenceReason: "Vacaciones de verano",
      absenceStart: "2025-08-01",
      absenceEnd: "2025-08-15",
      employee: "Carlos Rodríguez",
      employeeDni: "23456789C",
      sucursal: "Principal"
    }
  ]);

  // Función para cambiar entre vistas
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Función para cambiar entre vista de lista y calendario
  const toggleCalendarView = () => {
    setCalendarView(!calendarView);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // Manejo de selección de días de la semana
  const handleDaySelect = (day) => {
    const daysOfWeek = [...formData.daysOfWeek];
    if (daysOfWeek.includes(day)) {
      // Remover el día si ya está seleccionado
      setFormData({
        ...formData,
        daysOfWeek: daysOfWeek.filter(d => d !== day)
      });
    } else {
      // Agregar el día si no está seleccionado
      setFormData({
        ...formData,
        daysOfWeek: [...daysOfWeek, day].sort()
      });
    }
  };

  // Manejo para seleccionar todos los días laborales (lunes a viernes)
  const selectWeekdays = () => {
    setFormData({
      ...formData,
      daysOfWeek: [1, 2, 3, 4, 5] // Lunes a viernes
    });
  };

  // Manejo para seleccionar todos los días de la semana
  const selectAllDays = () => {
    setFormData({
      ...formData,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6] // Domingo a sábado
    });
  };

  // Manejo para limpiar selección de días
  const clearDaySelection = () => {
    setFormData({
      ...formData,
      daysOfWeek: []
    });
  };

  const handleEmployeeSelect = (employee) => {
    setFormData({ 
      ...formData, 
      employeeId: employee.name,
      employeeDni: employee.dni
    });
    setShowEmployeeDropdown(false);
    setEmployeeSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Determinar el tipo de entrada (horario regular o ausencia)
    const isAbsence = activeView === "ausencias";
    
    // Buscar el DNI del empleado seleccionado
    let selectedEmployee = employees.find(emp => emp.name === formData.employeeId);
    let employeeDni = selectedEmployee ? selectedEmployee.dni : "";
    
    const newSchedule = {
      id: isEditing ? currentScheduleId : schedules.length + 1,
      type: isAbsence ? "Ausencia" : "Horario Regular",
      employee: formData.applyToAll ? "Todos" : formData.employeeId,
      employeeDni: formData.applyToAll ? "" : employeeDni,
      applyToAll: formData.applyToAll,
      
      // Si es un horario regular, incluir estos campos
      ...(isAbsence ? {} : {
        scheduleType: formData.scheduleType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        daysOfWeek: formData.daysOfWeek,
        entryTime: formData.entryTime,
        exitTime: formData.exitTime
      }),
      
      // Si es una ausencia, incluir estos campos
      ...(isAbsence ? {
        absenceType: formData.absenceType,
        absenceReason: formData.absenceReason,
        absenceStart: formData.absenceStart,
        absenceEnd: formData.absenceEnd,
        description: formData.absenceType === "Día Festivo" ? "Día festivo" : formData.absenceReason
      } : {}),
      
      sucursal: userInfo?.role === "Operator" ? userInfo?.sucursal : formData.applyToAll ? "Todas" : "Principal",
      notes: formData.notes
    };
    
    if (isEditing) {
      setSchedules(schedules.map((sched) => (sched.id === currentScheduleId ? newSchedule : sched)));
      // Mostrar animación de edición
      setAnimatedItemId(currentScheduleId);
      setAnimationType("edit");
      setShowAnimation(true);
      showModal("success", `${isAbsence ? "Ausencia" : "Horario"} actualizado exitosamente!`);
    } else {
      setSchedules([...schedules, newSchedule]);
      // Mostrar animación de adición
      setAnimatedItemId(newSchedule.id);
      setAnimationType("add");
      setShowAnimation(true);
      showModal("success", `${isAbsence ? "Ausencia" : "Horario"} agregado exitosamente!`);
    }
    
    // Cerrar modal y limpiar formulario
    setShowFormModal(false);
    resetForm();
    
    // Desactivar la animación después de un tiempo
    setTimeout(() => {
      setShowAnimation(false);
      setAnimatedItemId(null);
      setAnimationType("");
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      employeeId: "",
      employeeDni: "",
      applyToAll: false,
      scheduleType: "Horario Regular",
      startDate: "",
      endDate: "",
      daysOfWeek: [1, 2, 3, 4, 5],
      entryTime: "08:00",
      exitTime: "17:00",
      absenceType: "Permiso Médico",
      absenceReason: "",
      absenceStart: "",
      absenceEnd: "",
      notes: ""
    });
    setIsEditing(false);
    setCurrentScheduleId(null);
  };

  const handleEdit = (schedule) => {
    // Limpiar el formulario primero
    resetForm();
    
    // Establecer datos según el tipo de horario
    if (schedule.type === "Horario Regular") {
      setActiveView("horarios");
      setFormData({
        ...formData,
        employeeId: schedule.employee !== "Todos" ? schedule.employee : "",
        employeeDni: schedule.employeeDni || "",
        applyToAll: schedule.applyToAll || false,
        scheduleType: schedule.scheduleType || "Horario Regular",
        startDate: schedule.startDate || "",
        endDate: schedule.endDate || "",
        daysOfWeek: schedule.daysOfWeek || [1, 2, 3, 4, 5],
        entryTime: schedule.entryTime || "08:00",
        exitTime: schedule.exitTime || "17:00",
        notes: schedule.notes || ""
      });
    } else {
      setActiveView("ausencias");
      setFormData({
        ...formData,
        employeeId: schedule.employee !== "Todos" ? schedule.employee : "",
        employeeDni: schedule.employeeDni || "",
        applyToAll: schedule.applyToAll || false,
        absenceType: schedule.absenceType || "Permiso Médico",
        absenceReason: schedule.absenceReason || "",
        absenceStart: schedule.absenceStart || "",
        absenceEnd: schedule.absenceEnd || "",
        notes: schedule.notes || ""
      });
    }
    
    setIsEditing(true);
    setCurrentScheduleId(schedule.id);
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    const scheduleToDelete = schedules.find(s => s.id === id);
    const scheduleType = scheduleToDelete.type === "Horario Regular" ? "horario" : "ausencia";
    
    showModal("confirmation", `¿Está seguro que desea eliminar este ${scheduleType}?`, () => {
      // Mostrar animación de eliminación
      setAnimatedItemId(id);
      setAnimationType("delete");
      setShowAnimation(true);
      
      // Después de la animación, eliminar el elemento
      setTimeout(() => {
        setSchedules(schedules.filter((sched) => sched.id !== id));
        setShowAnimation(false);
        setAnimatedItemId(null);
        setAnimationType("");
        showModal("success", `${scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)} eliminado exitosamente!`);
      }, 500);
    });
  };

  // Filtrar empleados basados en el término de búsqueda
  const filteredEmployees = employees.filter(
    (emp) => 
      emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
      emp.dni.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  // Filtrar horarios basados en el término de búsqueda, tipo activo y los permisos del usuario
  const filteredSchedules = schedules.filter(
    (sched) =>
      // Filtro por tipo de vista
      (activeView === "horarios" ? sched.type === "Horario Regular" : sched.type === "Ausencia") &&
      // Filtro por permisos de usuario
      (userInfo?.role === "Admin" ||
        (userInfo?.role === "Supervisor" && sched.sucursal === userInfo.region) ||
        (userInfo?.role === "Operator" && sched.sucursal === userInfo.sucursal)) &&
      // Filtro por término de búsqueda
      (sched.employee.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (sched.employeeDni && sched.employeeDni.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (sched.scheduleType && sched.scheduleType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (sched.absenceType && sched.absenceType.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Obtener días de la semana en formato legible
  const getDaysOfWeekText = (daysArray) => {
    if (!daysArray || daysArray.length === 0) return "No especificado";
    
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    if (daysArray.length === 7) return "Todos los días";
    if (JSON.stringify(daysArray.sort()) === JSON.stringify([1, 2, 3, 4, 5])) return "Lunes a Viernes";
    
    return daysArray.map(d => dayNames[d]).join(", ");
  };

  // Aplicar clase de animación según tipo
  const getAnimationClass = (id) => {
    if (animatedItemId === id && showAnimation) {
      if (animationType === "add") return "add-animation";
      if (animationType === "edit") return "edit-animation";
      if (animationType === "delete") return "delete-animation";
    }
    return "";
  };

  // Funciones para el calendario
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    let dayCounter = 1;
    
    // Calculate previous month's days to display
    const prevMonthDays = [];
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i)
      });
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(year, month, i)
      });
    }
    
    // Calculate next month's days to display (to fill a 6-row calendar)
    const totalCells = 42; // 6 rows x 7 days
    const nextMonthDays = [];
    const remainingCells = totalCells - (prevMonthDays.length + days.length);
    
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        currentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }
    
    return [...prevMonthDays, ...days, ...nextMonthDays];
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    
    return schedules.filter(event => {
      // Check if it's a schedule with days of week
      if (event.type === "Horario Regular") {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        
        // Check if date is within the schedule's date range
        if (date >= eventStart && date <= eventEnd) {
          // Check if the day of week is included
          const dayOfWeek = date.getDay();
          return event.daysOfWeek.includes(dayOfWeek);
        }
        return false;
      }
      
      // Check if it's an absence
      if (event.type === "Ausencia") {
        const absenceStart = new Date(event.absenceStart);
        const absenceEnd = new Date(event.absenceEnd);
        absenceStart.setHours(0, 0, 0, 0);
        absenceEnd.setHours(23, 59, 59, 999);
        
        return date >= absenceStart && date <= absenceEnd;
      }
      
      return false;
    });
  };

  // Datos para el calendario
  const calendarData = useMemo(() => getMonthData(), [currentMonth]);

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmployeeDropdown && !event.target.closest('.employee-search-container')) {
        setShowEmployeeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmployeeDropdown]);

  // Meses en español
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header animated-fade-in">
          <h1>Administración de Horarios</h1>
          <div className="header-actions">
            <div className="view-toggle animated-slide-in">
              <button 
                className={`view-btn ${activeView === "horarios" ? "active" : ""}`}
                onClick={() => handleViewChange("horarios")}
              >
                <FaClock className="view-icon" /> Horarios
              </button>
              <button 
                className={`view-btn ${activeView === "ausencias" ? "active" : ""}`}
                onClick={() => handleViewChange("ausencias")}
              >
                <FaCalendarTimes className="view-icon" /> Ausencias
              </button>
            </div>
            <div className="search-container animated-slide-in">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={`Buscar ${activeView === "horarios" ? "horarios" : "ausencias"}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="table-header animated-zoom-in">
          <div className="table-title">
            <h2>{activeView === "horarios" ? "Lista de Horarios" : "Lista de Ausencias"}</h2>
            <div className="view-actions">
              <button 
                className={`btn-view-toggle ${!calendarView ? "active" : ""}`} 
                onClick={() => setCalendarView(false)}
              >
                <FaRegListAlt className="btn-icon" /> Lista
              </button>
              <button 
                className={`btn-view-toggle ${calendarView ? "active" : ""}`} 
                onClick={() => setCalendarView(true)}
              >
                <FaCalendarAlt className="btn-icon" /> Calendario
              </button>
            </div>
          </div>
          <button className="btn-add pulse-animation" onClick={() => {
            resetForm();
            setShowFormModal(true);
          }}>
            <FaPlusCircle className="add-icon" />
            {activeView === "horarios" ? "Agregar Horario" : "Registrar Ausencia"}
          </button>
        </div>

        {!calendarView ? (
          <div className="table-container animated-zoom-in">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Empleado</th>
                    <th>DNI</th>
                    {activeView === "ausencias" && <th>Tipo</th>}
                    {activeView === "horarios" && <th>Tipo</th>}
                    <th>Período</th>
                    <th>Detalles</th>
                    <th>Sucursal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.length > 0 ? (
                    filteredSchedules.map((sched) => (
                      <tr 
                        key={sched.id}
                        data-id={sched.id}
                        className={getAnimationClass(sched.id)}
                      >
                        <td>{sched.id}</td>
                        <td>{sched.employee}</td>
                        <td>{sched.employeeDni || "-"}</td>
                        
                        {activeView === "ausencias" && (
                          <td>
                            <span className={`tipo-badge ${sched.absenceType && sched.absenceType.toLowerCase().replace(/\s+/g, '-')}`}>
                              {sched.absenceType}
                            </span>
                          </td>
                        )}
                        
                        {activeView === "horarios" && (
                          <td>
                            <span className={`tipo-badge horario-${sched.scheduleType && sched.scheduleType.toLowerCase().replace(/\s+/g, '-')}`}>
                              {sched.scheduleType}
                            </span>
                          </td>
                        )}
                        
                        <td>
                          {sched.type === "Horario Regular" ? (
                            <span className="detail-period">
                              <FaCalendarAlt className="detail-icon" /> 
                              {sched.startDate} al {sched.endDate}
                            </span>
                          ) : (
                            <span className="detail-period">
                              <FaCalendarAlt className="detail-icon" /> 
                              {sched.absenceStart === sched.absenceEnd 
                                ? sched.absenceStart 
                                : `${sched.absenceStart} al ${sched.absenceEnd}`}
                            </span>
                          )}
                        </td>
                        
                        <td>
                          {sched.type === "Horario Regular" && (
                            <div className="detail-container">
                              <span className="detail-time">
                                <FaClock className="detail-icon" /> {sched.entryTime} - {sched.exitTime}
                              </span>
                              <span className="detail-days">
                                {getDaysOfWeekText(sched.daysOfWeek)}
                              </span>
                            </div>
                          )}
                          {sched.type === "Ausencia" && (
                            <span className="detail-reason">
                              {sched.absenceReason || (sched.absenceType === "Día Festivo" ? "Día festivo" : "-")}
                            </span>
                          )}
                        </td>
                        
                        <td>{sched.sucursal}</td>
                        
                        <td className="actions">
                          <button
                            className="btn-edit btn-hover-effect"
                            onClick={() => handleEdit(sched)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-delete btn-hover-effect"
                            onClick={() => handleDelete(sched.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        No se encontraron {activeView === "horarios" ? "horarios" : "ausencias"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="calendar-view animated-zoom-in">
            <div className="calendar-header">
              <button className="btn-calendar-nav" onClick={prevMonth}>
                <FaChevronLeft />
              </button>
              <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
              <button className="btn-calendar-nav" onClick={nextMonth}>
                <FaChevronRight />
              </button>
            </div>
            
            <div className="calendar-grid">
              {/* Calendar weekday headers */}
              <div className="calendar-weekday">Dom</div>
              <div className="calendar-weekday">Lun</div>
              <div className="calendar-weekday">Mar</div>
              <div className="calendar-weekday">Mié</div>
              <div className="calendar-weekday">Jue</div>
              <div className="calendar-weekday">Vie</div>
              <div className="calendar-weekday">Sáb</div>
              
              {/* Calendar days */}
              {calendarData.map((day, index) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isToday = day.date.getTime() === today.getTime();
                const events = getEventsForDate(day.date);
                
                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${!day.currentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                  >
                    <div className="day-number">{day.day}</div>
                    <div className="day-events">
                      {events.length > 0 && (
                        <div className="event-indicators">
                          {events.filter(e => e.type === "Horario Regular").length > 0 && (
                            <span className="event-dot horario"></span>
                          )}
                          {events.filter(e => e.type === "Ausencia" && e.absenceType === "Vacaciones").length > 0 && (
                            <span className="event-dot vacaciones"></span>
                          )}
                          {events.filter(e => e.type === "Ausencia" && e.absenceType === "Permiso Médico").length > 0 && (
                            <span className="event-dot permiso-medico"></span>
                          )}
                          {events.filter(e => e.type === "Ausencia" && e.absenceType === "Permiso Personal").length > 0 && (
                            <span className="event-dot permiso-personal"></span>
                          )}
                          {events.filter(e => e.type === "Ausencia" && e.absenceType === "Día Festivo").length > 0 && (
                            <span className="event-dot dia-festivo"></span>
                          )}
                        </div>
                      )}
                      {events.length > 0 && events.slice(0, 2).map((event, i) => (
                        <div 
                          key={i}
                          className={`day-event ${event.type === "Horario Regular" ? 'event-horario' : `event-${event.absenceType.toLowerCase().replace(/\s+/g, '-')}`}`}
                          title={event.type === "Horario Regular" 
                            ? `${event.scheduleType}: ${event.entryTime} - ${event.exitTime}` 
                            : `${event.absenceType}: ${event.absenceReason || ''}`}
                        >
                          <span className="event-title">
                            {event.type === "Horario Regular" 
                              ? `${event.entryTime.substring(0, 5)}` 
                              : event.absenceType.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="more-events">+{events.length - 2} más</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="calendar-legend">
              <div className="legend-title">Leyenda:</div>
              <div className="legend-item">
                <span className="legend-dot horario"></span>
                <span>Horario Regular</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot vacaciones"></span>
                <span>Vacaciones</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot permiso-medico"></span>
                <span>Permiso Médico</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot permiso-personal"></span>
                <span>Permiso Personal</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dia-festivo"></span>
                <span>Día Festivo</span>
              </div>
            </div>
          </div>
        )}

        {showFormModal && (
          <div className="modal-overlay animated-fade-in">
            <div className="form-modal animated-pop-in">
              <div className="form-header">
                <h2>
                  {isEditing 
                    ? (activeView === "horarios" ? "Editar Horario" : "Editar Ausencia") 
                    : (activeView === "horarios" ? "Nuevo Horario" : "Nueva Ausencia")}
                </h2>
                <FaPlusCircle className="add-icon rotating-icon" />
              </div>
              
              <form className="modulo-form" onSubmit={handleSubmit}>
                {/* Sección Empleado - Común para ambas vistas */}
                <div className="form-section">
                  <h3 className="section-title">Información del Empleado</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          name="applyToAll"
                          checked={formData.applyToAll}
                          onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        Aplicar a todos los empleados
                      </label>
                    </div>
                  </div>
                  
                  {!formData.applyToAll && (
                    <div className="form-row">
                      <div className="form-group employee-search-container">
                        <label htmlFor="employeeId">Empleado</label>
                        <div className="employee-input-container">
                          <input
                            type="text"
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                            onFocus={() => setShowEmployeeDropdown(true)}
                            placeholder="Seleccione un empleado"
                            className="input-animation"
                            required={!formData.applyToAll}
                          />
                          <FaUser className="employee-icon" />
                          {showEmployeeDropdown && (
                            <div className="employee-dropdown">
                              <div className="employee-search">
                                <input
                                  type="text"
                                  placeholder="Buscar por nombre o DNI..."
                                  value={employeeSearchTerm}
                                  onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="input-animation"
                                />
                              </div>
                              <div className="employee-list">
                                {filteredEmployees.length > 0 ? (
                                  filteredEmployees.map((emp) => (
                                    <div
                                      key={emp.id}
                                      className="employee-item"
                                      onClick={() => handleEmployeeSelect(emp)}
                                    >
                                      <div className="employee-name">{emp.name}</div>
                                      <div className="employee-details">
                                        <FaIdCard className="dni-icon" /> {emp.dni}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="no-employees">No se encontraron empleados</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sección específica para Horarios */}
                {activeView === "horarios" && (
                  <div className="form-section">
                    <h3 className="section-title">Detalles del Horario</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="scheduleType">Tipo de Horario</label>
                        <select
                          id="scheduleType"
                          name="scheduleType"
                          value={formData.scheduleType}
                          onChange={handleChange}
                          required
                          className="select-animation"
                        >
                          {scheduleTypes.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="startDate">Fecha de Inicio</label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="endDate">Fecha de Fin</label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group days-selection">
                        <label>Días de la Semana</label>
                        <div className="days-container">
                          <div className="day-selectors">
                            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, index) => (
                              <div 
                                key={index}
                                className={`day-chip ${formData.daysOfWeek.includes(index) ? 'selected' : ''}`}
                                onClick={() => handleDaySelect(index)}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="day-actions">
                            <button type="button" className="btn-day-action" onClick={selectWeekdays}>L-V</button>
                            <button type="button" className="btn-day-action" onClick={selectAllDays}>Todos</button>
                            <button type="button" className="btn-day-action" onClick={clearDaySelection}>Ninguno</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="entryTime">Hora de Entrada</label>
                        <input
                          type="time"
                          id="entryTime"
                          name="entryTime"
                          value={formData.entryTime}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exitTime">Hora de Salida</label>
                        <input
                          type="time"
                          id="exitTime"
                          name="exitTime"
                          value={formData.exitTime}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Sección específica para Ausencias */}
                {activeView === "ausencias" && (
                  <div className="form-section">
                    <h3 className="section-title">Detalles de la Ausencia</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="absenceType">Tipo de Ausencia</label>
                        <select
                          id="absenceType"
                          name="absenceType"
                          value={formData.absenceType}
                          onChange={handleChange}
                          required
                          className="select-animation"
                        >
                          {absenceTypes.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="absenceStart">Fecha de Inicio</label>
                        <input
                          type="date"
                          id="absenceStart"
                          name="absenceStart"
                          value={formData.absenceStart}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="absenceEnd">Fecha de Fin</label>
                        <input
                          type="date"
                          id="absenceEnd"
                          name="absenceEnd"
                          value={formData.absenceEnd}
                          onChange={handleChange}
                          required
                          className="input-animation"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="absenceReason">Motivo</label>
                        <input
                          type="text"
                          id="absenceReason"
                          name="absenceReason"
                          value={formData.absenceReason}
                          onChange={handleChange}
                          placeholder="Especifique el motivo"
                          className="input-animation"
                          required={formData.absenceType !== "Día Festivo"}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Sección de Notas - Común para ambas vistas */}
                <div className="form-section">
                  <h3 className="section-title">Información Adicional</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="notes">Notas</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Agregue notas o instrucciones adicionales"
                        className="input-animation"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="btn-submit btn-hover-scale">
                    {isEditing 
                      ? (activeView === "horarios" ? "Actualizar Horario" : "Actualizar Ausencia") 
                      : (activeView === "horarios" ? "Guardar Horario" : "Registrar Ausencia")}
                  </button>
                  <button type="button" className="btn-cancel btn-hover-scale" onClick={() => setShowFormModal(false)}>
                    Cancelar
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