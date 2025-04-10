import React, { useState } from "react";
import "../estilos/Empleados.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash, FaFingerprint } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";


function ModuloEmpleados({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
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

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para mostrar el modal de huella
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);

  // Datos de ejemplo para la tabla de empleados
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", cedula: "V-12345678", telefono: "0412-1234567", email: "juan@ejemplo.com", sucursal: "Principal", departamento: "TI", cargo: "Desarrollador", fechaIngreso: "2023-01-15", estado: "Activo", huella: true },
    { id: 2, nombre: "María", apellido: "González", cedula: "V-23456789", telefono: "0414-2345678", email: "maria@ejemplo.com", sucursal: "Sucursal A", departamento: "RRHH", cargo: "Analista", fechaIngreso: "2022-05-20", estado: "Activo", huella: true },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", cedula: "V-34567890", telefono: "0424-3456789", email: "carlos@ejemplo.com", sucursal: "Sucursal B", departamento: "Finanzas", cargo: "Contador", fechaIngreso: "2023-03-10", estado: "Activo", huella: false },
    { id: 4, nombre: "Ana", apellido: "Martínez", cedula: "V-45678901", telefono: "0416-4567890", email: "ana@ejemplo.com", sucursal: "Principal", departamento: "Marketing", cargo: "Coordinador", fechaIngreso: "2022-11-05", estado: "Inactivo", huella: true },
    { id: 5, nombre: "Roberto", apellido: "Gómez", cedula: "V-56789012", telefono: "0412-5678901", email: "roberto@ejemplo.com", sucursal: "Sucursal C", departamento: "Ventas", cargo: "Vendedor", fechaIngreso: "2023-02-18", estado: "Activo", huella: false },
  ]);

  // Lista de sucursales (simulando datos que vendrían de una API)
  const sucursales = ["Principal", "Sucursal A", "Sucursal B", "Sucursal C"];
  
  // Lista de departamentos
  const departamentos = ["TI", "RRHH", "Finanzas", "Marketing", "Ventas", "Operaciones"];

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar empleado existente
      setEmpleados(
        empleados.map((emp) =>
          emp.id === currentEmployeeId ? { ...formData, id: currentEmployeeId } : emp
        )
      );
      setIsEditing(false);
      setCurrentEmployeeId(null);
    } else {
      // Crear nuevo empleado
      const newEmployee = {
        id: empleados.length + 1,
        ...formData,
      };
      setEmpleados([...empleados, newEmployee]);
    }
    // Limpiar formulario
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
  };

  // Función para editar un empleado
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
  };

  // Función para eliminar un empleado
  const handleDelete = (id) => {
    setEmpleados(empleados.filter((emp) => emp.id !== id));
  };

  // Función para cancelar la edición
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
  };

  // Función para mostrar modal de huella
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

  // Función para registrar huella
  const handleRegisterFingerprint = () => {
    // Aquí iría la lógica para conectar con el lector de huella
    setEmpleados(
      empleados.map((emp) =>
        emp.id === currentEmployeeId ? { ...emp, huella: true } : emp
      )
    );
    setShowFingerprintModal(false);
  };

  // Filtrar empleados basados en el término de búsqueda
  const filteredEmployees = empleados.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.sucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
     
      {/* Contenido principal */}
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

        {/* Formulario */}
        <div className="modulo-form-container">
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
                  {sucursales.map((sucursal, index) => (
                    <option key={index} value={sucursal}>
                      {sucursal}
                    </option>
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
                  {departamentos.map((depto, index) => (
                    <option key={index} value={depto}>
                      {depto}
                    </option>
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
                  <option value="Suspendido">Suspendido</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <label htmlFor="huella">
                  <input
                    type="checkbox"
                    id="huella"
                    name="huella"
                    checked={formData.huella}
                    onChange={handleChange}
                  />
                  <span>Huella Registrada</span>
                </label>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {isEditing ? "Actualizar Empleado" : "Registrar Empleado"}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de empleados */}
        <div className="table-container">
          <h2>Lista de Empleados</h2>
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

    

      {/* Modal para registro de huella */}
      {showFingerprintModal && (
        <div className="modal-overlay">
          <div className="fingerprint-modal">
            <h2>Registro de Huella Digital</h2>
            <p>Empleado: {formData.nombre} {formData.apellido}</p>
            <p>Cédula: {formData.cedula}</p>
            
            <div className="fingerprint-container">
              <div className="fingerprint-scanner">
                <FaFingerprint className="fingerprint-icon" />
              </div>
              <p className="scanner-instruction">Coloque su dedo en el lector para registrar la huella</p>
            </div>
            
            <div className="modal-buttons">
              <button className="btn-fingerprint-confirm" onClick={handleRegisterFingerprint}>
                Confirmar Registro
              </button>
              <button className="btn-fingerprint-cancel" onClick={() => setShowFingerprintModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuloEmpleados;
