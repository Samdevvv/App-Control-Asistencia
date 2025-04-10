import React, { useState } from "react";
import "../estilos/Oficinas.css";
import { FaSearch, FaPlusCircle, FaEdit, FaTrash, FaPhoneAlt, FaDesktop, FaBuilding, FaUsers } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";


function Oficinas({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    sucursal: "",
    ubicacion: "",
    capacidad: "",
    estado: "Activa"
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentOfficeId, setCurrentOfficeId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para la tabla de oficinas
  const [oficinas, setOficinas] = useState([
    { id: 1, nombre: "Oficina Principal", codigo: "OF-A01", sucursal: "Sucursal Principal", ubicacion: "Piso 1", capacidad: 20, estado: "Activa", equipos: 15, empleados: 18 },
    { id: 2, nombre: "Oficina Desarrollo", codigo: "OF-B02", sucursal: "Sucursal Este", ubicacion: "Piso 2", capacidad: 15, estado: "Activa", equipos: 12, empleados: 10 },
    { id: 3, nombre: "Oficina Ventas", codigo: "OF-C03", sucursal: "Sucursal Oeste", ubicacion: "Piso 3", capacidad: 10, estado: "Inactiva", equipos: 5, empleados: 0 },
    { id: 4, nombre: "Oficina RRHH", codigo: "OF-D04", sucursal: "Sucursal Norte", ubicacion: "Piso 1", capacidad: 8, estado: "Activa", equipos: 6, empleados: 5 },
    { id: 5, nombre: "Oficina Finanzas", codigo: "OF-E05", sucursal: "Sucursal Principal", ubicacion: "Piso 4", capacidad: 12, estado: "Activa", equipos: 10, empleados: 8 }
  ]);

  // Lista de sucursales (simulando datos que vendrían de una API)
  const sucursales = ["Sucursal Principal", "Sucursal Este", "Sucursal Oeste", "Sucursal Norte", "Sucursal Sur"];

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para editar una oficina
  const handleEdit = (office) => {
    setFormData({
      nombre: office.nombre,
      codigo: office.codigo,
      sucursal: office.sucursal,
      ubicacion: office.ubicacion,
      capacidad: office.capacidad,
      estado: office.estado
    });
    setIsEditing(true);
    setCurrentOfficeId(office.id);
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar oficina existente
      setOficinas(
        oficinas.map((office) =>
          office.id === currentOfficeId ? { ...formData, id: currentOfficeId, equipos: office.equipos, empleados: office.empleados } : office
        )
      );
      setIsEditing(false);
      setCurrentOfficeId(null);
    } else {
      // Crear nueva oficina
      const newOffice = {
        id: oficinas.length + 1,
        ...formData,
        equipos: 0,
        empleados: 0
      };
      setOficinas([...oficinas, newOffice]);
    }
    // Limpiar formulario
    setFormData({
      nombre: "",
      codigo: "",
      sucursal: "",
      ubicacion: "",
      capacidad: "",
      estado: "Activa"
    });
  };

  // Función para eliminar una oficina
  const handleDelete = (id) => {
    setOficinas(oficinas.filter((office) => office.id !== id));
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setFormData({
      nombre: "",
      codigo: "",
      sucursal: "",
      ubicacion: "",
      capacidad: "",
      estado: "Activa"
    });
    setIsEditing(false);
    setCurrentOfficeId(null);
  };

  // Filtrar oficinas basadas en el término de búsqueda
  const filteredOffices = oficinas.filter(
    (office) =>
      office.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.sucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
      {/* Sidebar Izquierda */}
    

      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Oficinas</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar oficina..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="modulo-form-container">
          <div className="form-header">
            <h2>{isEditing ? "Editar Oficina" : "Nueva Oficina"}</h2>
            <FaPlusCircle className="add-icon" />
          </div>
          
          <form className="modulo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre de la Oficina</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el nombre de la oficina"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="codigo">Código</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                  placeholder="Ej. OF-A01"
                />
              </div>
            </div>
            
            <div className="form-row">
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
                <label htmlFor="ubicacion">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Piso 1, Ala Norte"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="capacidad">Capacidad (personas)</label>
                <input
                  type="number"
                  id="capacidad"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Ingrese capacidad"
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
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                  <option value="En Mantenimiento">En Mantenimiento</option>
                </select>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {isEditing ? "Actualizar Oficina" : "Registrar Oficina"}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de oficinas */}
        <div className="table-container">
          <h2>Lista de Oficinas</h2>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Código</th>
                  <th>Sucursal</th>
                  <th>Ubicación</th>
                  <th>Capacidad</th>
                  <th>Empleados</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffices.length > 0 ? (
                  filteredOffices.map((office) => (
                    <tr key={office.id}>
                      <td>{office.id}</td>
                      <td>{office.nombre}</td>
                      <td><span className="codigo-badge">{office.codigo}</span></td>
                      <td>{office.sucursal}</td>
                      <td>{office.ubicacion}</td>
                      <td>{office.capacidad}</td>
                      <td>
                        <div className="capacity-indicator">
                          <div className="capacity-bar">
                            <div 
                              className="capacity-fill" 
                              style={{ 
                                width: `${Math.min(100, (office.empleados / office.capacidad) * 100)}%`,
                                backgroundColor: office.empleados > office.capacidad ? '#dc3545' : office.empleados >= office.capacidad * 0.8 ? '#ffc107' : '#198754'
                              }}
                            ></div>
                          </div>
                          <span>{office.empleados} / {office.capacidad}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`estado ${office.estado.toLowerCase().replace(/\s+/g, '-')}`}>
                          {office.estado}
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(office)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(office.id)}
                          disabled={office.empleados > 0}
                          title={office.empleados > 0 ? "No se puede eliminar una oficina con empleados asignados" : ""}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No se encontraron oficinas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Cards de oficinas */}
        <div className="office-cards">
          {filteredOffices.length > 0 ? (
            filteredOffices.map((office) => (
              <div key={office.id} className="office-card">
                <div className={`office-card-header ${office.estado.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="office-title">
                    <h3>{office.nombre}</h3>
                    <span className="codigo-badge">{office.codigo}</span>
                  </div>
                  <span className="estado-badge">
                    {office.estado}
                  </span>
                </div>
                
                <div className="office-card-content">
                  <div className="office-info">
                    <div className="info-item">
                      <FaBuilding className="info-icon" />
                      <span>{office.sucursal}</span>
                    </div>
                    <div className="info-item">
                      <MdLocationOn className="info-icon" />
                      <span>{office.ubicacion}</span>
                    </div>
                    <div className="info-item">
                      <FaUsers className="info-icon" />
                      <span>{office.empleados} empleados</span>
                    </div>
                    <div className="info-item">
                      <FaDesktop className="info-icon" />
                      <span>{office.equipos} equipos</span>
                    </div>
                  </div>
                  
                  <div className="capacity-box">
                    <div className="capacity-header">
                      <span>Capacidad</span>
                      <span>{office.empleados} / {office.capacidad}</span>
                    </div>
                    <div className="capacity-progress">
                      <div 
                        className="capacity-progress-bar" 
                        style={{ 
                          width: `${Math.min(100, (office.empleados / office.capacidad) * 100)}%`,
                          backgroundColor: office.empleados > office.capacidad ? '#dc3545' : office.empleados >= office.capacidad * 0.8 ? '#ffc107' : '#198754'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="office-card-actions">
                  <button className="btn-card-edit" onClick={() => handleEdit(office)}>
                    <FaEdit /> Editar
                  </button>
                  <button 
                    className="btn-card-delete" 
                    onClick={() => handleDelete(office.id)}
                    disabled={office.empleados > 0}
                  >
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No se encontraron oficinas</div>
          )}
        </div>
      </div>

    
    </div>
  );
}

export default Oficinas;