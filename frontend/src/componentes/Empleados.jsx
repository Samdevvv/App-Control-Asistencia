import React, { useState, useEffect, useContext } from "react";
import "../estilos/Empleados.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash, FaFingerprint, FaCalendarAlt } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";
import { ModalContext } from "./ModalManager"; // Replace ../contexts/ModalContext

function ModuloEmpleados({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: "",
    sucursal: "",
    departamento: "",
    cargo: "",
    fechaIngreso: "",
    estado: "Activo",
    huella: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", cedula: "V-12345678", telefono: "0412-1234567", email: "juan@ejemplo.com", sucursal: "Principal", departamento: "TI", cargo: "Desarrollador", fechaIngreso: "2023-01-15", estado: "Activo", huella: true },
    { id: 2, nombre: "María", apellido: "González", cedula: "V-23456789", telefono: "0414-2345678", email: "maria@ejemplo.com", sucursal: "Sucursal A", departamento: "RRHH", cargo: "Analista", fechaIngreso: "2022-05-20", estado: "Activo", huella: true },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", cedula: "V-34567890", telefono: "0424-3456789", email: "carlos@ejemplo.com", sucursal: "Sucursal B", departamento: "Finanzas", cargo: "Contador", fechaIngreso: "2023-03-10", estado: "Activo", huella: false },
  ]);
  const sucursales = userInfo.role === "Operator" ? [userInfo.sucursal] : ["Principal", "Sucursal A", "Sucursal B", "Sucursal C"];
  const departamentos = ["TI", "RRHH", "Finanzas", "Marketing", "Ventas", "Operaciones"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmpleados(
        empleados.map((emp) =>
          emp.id === currentEmployeeId ? { ...formData, id: currentEmployeeId } : emp
        )
      );
      showModal("success", "Employee updated successfully!");
    } else {
      const newEmployee = {
        id: empleados.length + 1,
        ...formData,
      };
      setEmpleados([...empleados, newEmployee]);
      showModal("success", "Employee added successfully!");
    }
    setShowFormModal(false);
    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      email: "",
      sucursal: "",
      departamento: "",
      cargo: "",
      fechaIngreso: "",
      estado: "Activo",
      huella: false
    });
    setIsEditing(false);
    setCurrentEmployeeId(null);
  };

  const handleEdit = (employee) => {
    setFormData({
      nombre: employee.nombre,
      apellido: employee.apellido,
      cedula: employee.cedula,
      telefono: employee.telefono,
      email: employee.email,
      sucursal: employee.sucursal,
      departamento: employee.departamento,
      cargo: employee.cargo,
      fechaIngreso: employee.fechaIngreso,
      estado: employee.estado,
      huella: employee.huella
    });
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    showModal("confirmation", "Are you sure you want to delete this employee?", () => {
      setEmpleados(empleados.filter((emp) => emp.id !== id));
      showModal("success", "Employee deleted successfully!");
    });
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      email: "",
      sucursal: "",
      departamento: "",
      cargo: "",
      fechaIngreso: "",
      estado: "Activo",
      huella: false
    });
    setIsEditing(false);
    setCurrentEmployeeId(null);
    setShowFormModal(false);
  };

  const handleFingerprintModal = (employee) => {
    setFormData({
      ...formData,
      nombre: employee.nombre,
      apellido: employee.apellido,
      cedula: employee.cedula,
    });
    setCurrentEmployeeId(employee.id);
    setShowFingerprintModal(true);
  };

  const handleRegisterFingerprint = () => {
    setEmpleados(
      empleados.map((emp) =>
        emp.id === currentEmployeeId ? { ...emp, huella: true } : emp
      )
    );
    setShowFingerprintModal(false);
    showModal("success", "Fingerprint registered successfully!");
  };

  const filteredEmployees = empleados.filter(
    (emp) =>
      (userInfo.role === "Admin" ||
        (userInfo.role === "Supervisor" && emp.sucursal === userInfo.region) ||
        (userInfo.role === "Operator" && emp.sucursal === userInfo.sucursal)) &&
      (emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.sucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.estado.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const checkTableScroll = () => {
      const tableContainer = document.querySelector('.table-responsive');
      if (tableContainer) {
        if (tableContainer.scrollWidth > tableContainer.clientWidth) {
          tableContainer.classList.add('has-scroll');
        } else {
          tableContainer.classList.remove('has-scroll');
        }
      }
    };
    checkTableScroll();
    window.addEventListener('resize', checkTableScroll);
    return () => {
      window.removeEventListener('resize', checkTableScroll);
    };
  }, []);

  return (
    <div className="modulo-container">
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Empleados</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-header">
          <h2>Lista de Empleados</h2>
          <button className="btn-add" onClick={() => setShowFormModal(true)}>
            <FaPlusCircle className="add-icon" />
            Nuevo Empleado
          </button>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cédula</th>
                  <th>Sucursal</th>
                  <th>Departamento</th>
                  <th>Cargo</th>
                  <th>Estado</th>
                  <th>Huella</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.nombre}</td>
                      <td>{employee.apellido}</td>
                      <td>{employee.cedula}</td>
                      <td>{employee.sucursal}</td>
                      <td>{employee.departamento}</td>
                      <td>{employee.cargo}</td>
                      <td>
                        <span className={`estado ${employee.estado.toLowerCase()}`}>
                          {employee.estado}
                        </span>
                      </td>
                      <td>
                        {employee.huella ? (
                          <span className="huella-registrada">
                            <FaFingerprint />
                          </span>
                        ) : (
                          <button
                            className="btn-fingerprint"
                            onClick={() => handleFingerprintModal(employee)}
                          >
                            Registrar
                          </button>
                        )}
                      </td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(employee)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(employee.id)}
                          disabled={userInfo.role !== "Admin"}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn-schedule"
                          onClick={() => onNavigate("schedules", { employeeId: employee.id })}
                        >
                          <FaCalendarAlt />
                        </button>
                        <button
                          className="btn-attendance"
                          onClick={() => onNavigate("attendance", { employeeId: employee.id })}
                        >
                          <FaFingerprint />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No se encontraron empleados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h2>{isEditing ? "Editar Empleado" : "Nuevo Empleado"}</h2>
              <FaPlusCircle className="add-icon" />
            </div>
            <form className="modulo-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el apellido"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cedula">Cédula</label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                    placeholder="V-12345678"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="0412-1234567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sucursal">Sucursal</label>
                  <select
                    id="sucursal"
                    name="sucursal"
                    value={formData.sucursal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione una sucursal</option>
                    {sucursales.map((sucursal) => (

                    <option key={sucursal} value={sucursal}> {sucursal} </option> ))} </select> </div>
                     <div className="form-group"> 
                      <label htmlFor="departamento">Departamento</label>
                       <select id="departamento" name="departamento" 
                       value={formData.departamento} onChange={handleChange} 
                       required > <option value="">Seleccione un departamento</option>
                        {departamentos.map((dep) => ( <option key={dep} value={dep}> {dep}
                       </option> ))} </select> </div> <div className="form-group"> <label htmlFor="cargo">Cargo</label> 
                       <input type="text" id="cargo" name="cargo" value={formData.cargo} 
                       onChange={handleChange} required placeholder="Ingrese el cargo" />
                       </div> <div className="form-group"> <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                        <input type="date" id="fechaIngreso" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} required /> </div> <div className="form-group"> <label htmlFor="estado">Estado</label> <select id="estado" name="estado" value={formData.estado} onChange={handleChange} required > <option value="Activo">Activo</option> <option value="Inactivo">Inactivo</option> <option value="De Licencia">De Licencia</option> </select> </div> <div className="form-group checkbox"> <label htmlFor="huella"> <input type="checkbox" id="huella" name="huella" checked={formData.huella} onChange={handleChange} /> Huella Registrada </label> </div> </div> <div className="form-buttons"> <button type="submit" className="btn-submit"> {isEditing ? "Actualizar Empleado" : "Agregar Empleado"} </button> <button type="button" className="btn-cancel" onClick={handleCancel} > Cancelar </button> </div> </form> </div> </div> )}
                     {showFingerprintModal && (
                    <div className="modal-overlay"> <div className="form-modal"> <div className="form-header"> <h2>Registrar Huella</h2> <FaFingerprint className="add-icon" /> </div> <div className="fingerprint-modal-content"> <p> Registrar huella para {formData.nombre} {formData.apellido} ( {formData.cedula}) </p> <div className="fingerprint-placeholder"> <FaFingerprint className="fingerprint-icon" /> <p>Escaneando huella...</p> </div> <div className="form-buttons"> <button className="btn-submit" onClick={handleRegisterFingerprint} > Confirmar Registro </button> <button className="btn-cancel" onClick={() => setShowFingerprintModal(false)} > Cancelar </button> </div> </div> </div> </div> )} </div> ); }

                    export default ModuloEmpleados;