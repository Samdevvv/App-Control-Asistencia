import React, { useState, useEffect, useContext } from "react";
import "../estilos/Empleados.css";
import { 
  FaUserAlt, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaFileAlt, 
  FaSearch, 
  FaPlusCircle, 
  FaEdit, 
  FaTrash, 
  FaFingerprint, 
  FaCalendarAlt,
  FaToggleOn,
  FaToggleOff,
  FaSpinner,
  FaCheck
} from "react-icons/fa";
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
  const [capturingFingerprint, setCapturingFingerprint] = useState(false);
  const [empleados, setEmpleados] = useState([
    // Aseguramos que todos los empleados iniciales tengan huella registrada
    { id: 1, nombre: "Juan", apellido: "Pérez", cedula: "V-12345678", telefono: "0412-1234567", email: "juan@ejemplo.com", sucursal: "Principal", departamento: "TI", cargo: "Desarrollador", fechaIngreso: "2023-01-15", estado: "Activo", huella: true },
    { id: 2, nombre: "María", apellido: "González", cedula: "V-23456789", telefono: "0414-2345678", email: "maria@ejemplo.com", sucursal: "Sucursal A", departamento: "RRHH", cargo: "Analista", fechaIngreso: "2022-05-20", estado: "Activo", huella: true },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", cedula: "V-34567890", telefono: "0424-3456789", email: "carlos@ejemplo.com", sucursal: "Sucursal B", departamento: "Finanzas", cargo: "Contador", fechaIngreso: "2023-03-10", estado: "Activo", huella: true }
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
    
    // Verificación obligatoria de huella dactilar
    if (!formData.huella) {
      showModal("error", "Debe registrar la huella dactilar del empleado antes de guardar");
      return;
    }
    
    if (isEditing) {
      setEmpleados(
        empleados.map((emp) =>
          emp.id === currentEmployeeId ? { ...formData, id: currentEmployeeId } : emp
        )
      );
      showModal("success", "Empleado actualizado exitosamente!");
    } else {
      const newEmployee = {
        id: empleados.length + 1,
        ...formData,
      };
      setEmpleados([...empleados, newEmployee]);
      showModal("success", "Empleado agregado exitosamente!");
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
    // Asegurar que el empleado tenga huella registrada
    if (!employee.huella) {
      showModal("error", "Error: Se ha detectado un empleado sin huella registrada. Contacte al administrador del sistema.");
      return;
    }
    
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
      huella: employee.huella // Siempre será true
    });
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
    setShowFormModal(true);
  };

  const handleToggleStatus = (id) => {
    setEmpleados(
      empleados.map((emp) =>
        emp.id === id
          ? { ...emp, estado: emp.estado === "Activo" ? "Inactivo" : "Activo" }
          : emp
      )
    );
    showModal("success", "Estado del empleado actualizado exitosamente!");
  };

  const handleDelete = (id) => {
    showModal("confirmation", "¿Está seguro que desea eliminar este empleado?", () => {
      setEmpleados(empleados.filter((emp) => emp.id !== id));
      showModal("success", "Empleado eliminado exitosamente!");
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
    setCapturingFingerprint(false);
  };

  const startFingerprintCapture = () => {
    setCapturingFingerprint(true);
    
    // Simular el registro de huella después de 3 segundos
    setTimeout(() => {
      setFormData({
        ...formData,
        huella: true
      });
      setCapturingFingerprint(false);
      showModal("success", "¡Huella dactilar registrada exitosamente!");
    }, 3000);
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

  // Verificación de integridad de datos - asegurar que todos los empleados tengan huella
  useEffect(() => {
    // Verificar si hay empleados sin huella y advertir al administrador
    const empleadosSinHuella = empleados.filter(emp => !emp.huella);
    
    if (empleadosSinHuella.length > 0 && userInfo.role === "Admin") {
      showModal("warning", `Se han detectado ${empleadosSinHuella.length} empleado(s) sin huella registrada. Esto puede indicar un problema en la base de datos.`);
    }
  }, []);

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
                        {/* Siempre mostramos huella como registrada ya que es obligatorio */}
                        <span className="huella-registrada">
                          <FaFingerprint />
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(employee)}
                          title="Editar empleado"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-toggle"
                          onClick={() => handleToggleStatus(employee.id)}
                          title={employee.estado === "Activo" ? "Desactivar empleado" : "Activar empleado"}
                        >
                          {employee.estado === "Activo" ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(employee.id)}
                          disabled={userInfo.role !== "Admin"}
                          title="Eliminar empleado"
                        >
                          <FaTrash />
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
              <FaUserAlt className="user-icon" />
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
                      <option key={sucursal} value={sucursal}>{sucursal}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="departamento">Departamento</label>
                  <select
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map((dep) => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cargo">Cargo</label>
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el cargo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                  <input
                    type="date"
                    id="fechaIngreso"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="De Licencia">De Licencia</option>
                  </select>
                </div>
              </div>

              {/* Sección de registro de huella dactilar - siempre requerido */}
              <div className="fingerprint-section">
                <div className="fingerprint-header">
                  <h3>Registro de Huella Dactilar <span className="required">*</span></h3>
                  <span className={`fingerprint-status ${formData.huella ? 'registered' : 'not-registered'}`}>
                    {formData.huella ? 'Registrada' : 'No Registrada'}
                  </span>
                </div>
                
                {isEditing && formData.huella ? (
                  <div className="huella-verified">
                    <div className="fingerprint-verified">
                      <FaFingerprint className="fingerprint-icon-large registered" />
                      <FaCheck className="check-icon" />
                    </div>
                    <p>Huella dactilar registrada correctamente</p>
                  </div>
                ) : capturingFingerprint ? (
                  <div className="fingerprint-capturing">
                    <div className="fingerprint-animation">
                      <FaFingerprint className="fingerprint-icon-large pulse" />
                      <div className="scanning-line"></div>
                    </div>
                    <p>Coloque su dedo en el lector de huella...</p>
                    <FaSpinner className="loading-spinner" />
                  </div>
                ) : (
                  <div className="fingerprint-container">
                    <p className="fingerprint-instructions">El registro de huella dactilar es obligatorio para todos los empleados</p>
                    <button 
                      type="button" 
                      className={`btn-fingerprint ${formData.huella ? 'registered' : ''}`}
                      onClick={startFingerprintCapture}
                      disabled={formData.huella}
                    >
                      <FaFingerprint className="fingerprint-btn-icon" />
                      {formData.huella ? 'Huella Registrada' : 'Registrar Huella'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={!formData.huella}
                >
                  {isEditing ? "Actualizar Empleado" : "Agregar Empleado"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuloEmpleados;