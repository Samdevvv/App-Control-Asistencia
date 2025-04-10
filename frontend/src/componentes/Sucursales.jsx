import React, { useState } from "react";
import "../estilos/Sucursales.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt as FaLocation } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";



function ModuloSucursales({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    region: "",
    oficina: "",
    estado: "Activa"
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para la tabla de sucursales
  const [sucursales, setSucursales] = useState([
    { id: 1, nombre: "Sucursal Principal", direccion: "Av. Libertador #123", telefono: "0212-5551234", email: "principal@empresa.com", region: "Central", oficina: "Oficina A", estado: "Activa" },
    { id: 2, nombre: "Sucursal Este", direccion: "Calle Miranda #456", telefono: "0212-5555678", email: "este@empresa.com", region: "Este", oficina: "Oficina B", estado: "Activa" },
    { id: 3, nombre: "Sucursal Oeste", direccion: "Av. Bolívar #789", telefono: "0212-5559012", email: "oeste@empresa.com", region: "Oeste", oficina: "Oficina C", estado: "Inactiva" },
    { id: 4, nombre: "Sucursal Norte", direccion: "Calle Principal #1011", telefono: "0212-5553456", email: "norte@empresa.com", region: "Norte", oficina: "Oficina D", estado: "Activa" }
  ]);

  // Lista de regiones (simulando datos que vendrían de una API)
  const regiones = ["Central", "Este", "Oeste", "Norte", "Sur"];
  
  // Lista de oficinas
  const oficinas = ["Oficina A", "Oficina B", "Oficina C", "Oficina D", "Oficina E"];

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar sucursal existente
      setSucursales(
        sucursales.map((branch) =>
          branch.id === currentBranchId ? { ...formData, id: currentBranchId } : branch
        )
      );
      setIsEditing(false);
      setCurrentBranchId(null);
    } else {
      // Crear nueva sucursal
      const newBranch = {
        id: sucursales.length + 1,
        ...formData,
      };
      setSucursales([...sucursales, newBranch]);
    }
    // Limpiar formulario
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      region: "",
      oficina: "",
      estado: "Activa"
    });
  };

  // Función para editar una sucursal
  const handleEdit = (branch) => {
    setFormData({
      nombre: branch.nombre,
      direccion: branch.direccion,
      telefono: branch.telefono,
      email: branch.email,
      region: branch.region,
      oficina: branch.oficina,
      estado: branch.estado
    });
    setIsEditing(true);
    setCurrentBranchId(branch.id);
  };

  // Función para eliminar una sucursal
  const handleDelete = (id) => {
    setSucursales(sucursales.filter((branch) => branch.id !== id));
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      region: "",
      oficina: "",
      estado: "Activa"
    });
    setIsEditing(false);
    setCurrentBranchId(null);
  };

  // Filtrar sucursales basadas en el término de búsqueda
  const filteredBranches = sucursales.filter(
    (branch) =>
      branch.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.oficina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
      {/* Sidebar Izquierda */}
     

      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Sucursales</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar sucursal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="modulo-form-container">
          <div className="form-header">
            <h2>{isEditing ? "Editar Sucursal" : "Nueva Sucursal"}</h2>
            <FaPlusCircle className="add-icon" />
          </div>
          
          <form className="modulo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre de la Sucursal</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el nombre de la sucursal"
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
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese la dirección completa"
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
                  placeholder="0212-1234567"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="region">Región</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una región</option>
                  {regiones.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="oficina">Oficina</label>
                <select
                  id="oficina"
                  name="oficina"
                  value={formData.oficina}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una oficina</option>
                  {oficinas.map((oficina, index) => (
                    <option key={index} value={oficina}>
                      {oficina}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
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
                </select>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {isEditing ? "Actualizar Sucursal" : "Registrar Sucursal"}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de sucursales */}
        <div className="table-container">
          <h2>Lista de Sucursales</h2>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Región</th>
                  <th>Oficina</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.length > 0 ? (
                  filteredBranches.map((branch) => (
                    <tr key={branch.id}>
                      <td>{branch.id}</td>
                      <td>{branch.nombre}</td>
                      <td>{branch.direccion}</td>
                      <td>{branch.telefono}</td>
                      <td>{branch.email}</td>
                      <td>{branch.region}</td>
                      <td>{branch.oficina}</td>
                      <td>
                        <span className={`estado ${branch.estado.toLowerCase()}`}>
                          {branch.estado}
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(branch)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(branch.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No se encontraron sucursales</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tarjetas de sucursales */}
        <div className="branch-cards">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-card-header">
                  <h3>{branch.nombre}</h3>
                  <span className={`estado-badge ${branch.estado.toLowerCase()}`}>
                    {branch.estado}
                  </span>
                </div>
                
                <div className="branch-card-content">
                  <div className="branch-info">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>{branch.direccion}</span>
                  </div>
                  <div className="branch-info">
                    <FaPhoneAlt className="info-icon" />
                    <span>{branch.telefono}</span>
                  </div>
                  <div className="branch-info">
                    <FaEnvelope className="info-icon" />
                    <span>{branch.email}</span>
                  </div>
                  <div className="branch-info">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>Región: {branch.region}</span>
                  </div>
                  <div className="branch-info">
                    <FaMapMarkerAlt className="info-icon" />
                    <span>Oficina: {branch.oficina}</span>
                  </div>
                </div>
                
                <div className="branch-card-actions">
                  <button className="btn-card-edit" onClick={() => handleEdit(branch)}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn-card-delete" onClick={() => handleDelete(branch.id)}>
                    <FaTrash /> Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No se encontraron sucursales</div>
          )}
        </div>
      </div>

     
    </div>
  );
}

export default ModuloSucursales;