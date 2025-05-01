import React, { useState, useEffect } from "react";
import "../estilos/Sucursales.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash, FaPhoneAlt, FaMapMarkerAlt as FaLocation } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";

function ModuloSucursales({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    region: "",
    estado: "Activa"
  });

  // Estado para controlar el modo de edición y modal
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranchId, setCurrentBranchId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  
  // Estado para mostrar animación al añadir/editar
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatedItemId, setAnimatedItemId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para la tabla de sucursales
  const [sucursales, setSucursales] = useState([
    { id: 1, nombre: "Sucursal Principal", direccion: "Av. Libertador #123", telefono: "0212-5551234", region: "Central", estado: "Activa" },
    { id: 2, nombre: "Sucursal Este", direccion: "Calle Miranda #456", telefono: "0212-5555678", region: "Este", estado: "Activa" },
    { id: 3, nombre: "Sucursal Oeste", direccion: "Av. Bolívar #789", telefono: "0212-5559012", region: "Oeste", estado: "Inactiva" },
    { id: 4, nombre: "Sucursal Norte", direccion: "Calle Principal #1011", telefono: "0212-5553456", region: "Norte", estado: "Activa" }
  ]);

  // Lista de regiones (simulando datos que vendrían de una API)
  const regiones = ["Central", "Este", "Oeste", "Norte", "Sur"];
  
  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo de envío del formulario con animación
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
      
      // Mostrar animación en el elemento editado
      setAnimatedItemId(currentBranchId);
      setShowAnimation(true);
    } else {
      // Crear nueva sucursal
      const newBranch = {
        id: sucursales.length + 1,
        ...formData,
      };
      setSucursales([...sucursales, newBranch]);
      
      // Mostrar animación en el nuevo elemento
      setAnimatedItemId(newBranch.id);
      setShowAnimation(true);
    }
    
    // Cerrar modal y limpiar formulario
    setShowFormModal(false);
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      region: "",
      estado: "Activa"
    });
    
    // Desactivar la animación después de 1.5 segundos
    setTimeout(() => {
      setShowAnimation(false);
      setAnimatedItemId(null);
    }, 1500);
  };

  // Función para editar una sucursal
  const handleEdit = (branch) => {
    setFormData({
      nombre: branch.nombre,
      direccion: branch.direccion,
      telefono: branch.telefono,
      region: branch.region,
      estado: branch.estado
    });
    setIsEditing(true);
    setCurrentBranchId(branch.id);
    setShowFormModal(true);
  };

  // Función para eliminar una sucursal con animación
  const handleDelete = (id) => {
    // Primero marcar para animación de eliminación
    setAnimatedItemId(id);
    document.querySelector(`tr[data-id="${id}"]`)?.classList.add('delete-animation');
    document.querySelector(`.branch-card[data-id="${id}"]`)?.classList.add('delete-animation');
    
    // Después de la animación, eliminar el elemento
    setTimeout(() => {
      setSucursales(sucursales.filter((branch) => branch.id !== id));
    }, 500);
  };

  // Función para cerrar el modal y cancelar
  const handleCancel = () => {
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      region: "",
      estado: "Activa"
    });
    setIsEditing(false);
    setCurrentBranchId(null);
    setShowFormModal(false);
  };

  // Filtrar sucursales basadas en el término de búsqueda
  const filteredBranches = sucursales.filter(
    (branch) =>
      branch.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header animated-fade-in">
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

        {/* Botón de Nueva Sucursal y Tabla */}
        <div className="table-header animated-slide-in">
          <h2>Lista de Sucursales</h2>
          <button className="btn-add pulse-animation" onClick={() => setShowFormModal(true)}>
            <FaPlusCircle className="add-icon" />
            Nueva Sucursal
          </button>
        </div>

        {/* Tabla de sucursales */}
        <div className="table-container animated-zoom-in">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Región</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.length > 0 ? (
                  filteredBranches.map((branch) => (
                    <tr 
                      key={branch.id} 
                      data-id={branch.id} 
                      className={animatedItemId === branch.id && showAnimation ? 'highlight-animation' : ''}
                    >
                      <td>{branch.id}</td>
                      <td>{branch.nombre}</td>
                      <td>{branch.direccion}</td>
                      <td>{branch.telefono}</td>
                      <td>{branch.region}</td>
                      <td>
                        <span className={`estado ${branch.estado.toLowerCase()}`}>
                          {branch.estado}
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-edit btn-hover-effect"
                          onClick={() => handleEdit(branch)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn-delete btn-hover-effect"
                          onClick={() => handleDelete(branch.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No se encontraron sucursales</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tarjetas de sucursales */}
        <div className="branch-cards animated-stagger">
          {filteredBranches.length > 0 ? (
            filteredBranches.map((branch, index) => (
              <div 
                key={branch.id} 
                data-id={branch.id} 
                className={`branch-card card-stagger-${index % 3} ${animatedItemId === branch.id && showAnimation ? 'highlight-animation' : ''}`}
              >
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
                    <FaLocation className="info-icon" />
                    <span>Región: {branch.region}</span>
                  </div>
                </div>
                
                <div className="branch-card-actions">
                  <button className="btn-card-edit btn-hover-effect" onClick={() => handleEdit(branch)}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn-card-delete btn-hover-effect" onClick={() => handleDelete(branch.id)}>
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

      {/* Modal para formulario de sucursal */}
      {showFormModal && (
        <div className="modal-overlay animated-fade-in">
          <div className="form-modal animated-pop-in">
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
                    className="input-animation"
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
                    className="input-animation"
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
                    className="input-animation"
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
                    className="select-animation"
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
                  <label htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    className="select-animation"
                  >
                    <option value="Activa">Activa</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>
                </div>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="btn-submit btn-hover-scale">
                  {isEditing ? "Actualizar Sucursal" : "Registrar Sucursal"}
                </button>
                <button type="button" className="btn-cancel btn-hover-scale" onClick={handleCancel}>
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

export default ModuloSucursales;