import React, { useState } from "react";
import "../estilos/Regiones.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash, FaGlobeAmericas } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";



function ModuloRegiones({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    estado: "Activa"
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentRegionId, setCurrentRegionId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para la visualización (tabla o tarjetas)
  const [viewMode, setViewMode] = useState("tabla");

  // Datos de ejemplo para la tabla de regiones
  const [regiones, setRegiones] = useState([
    { id: 1, nombre: "Central", codigo: "REG-CTR", descripcion: "Región central del país", estado: "Activa", sucursales: 5 },
    { id: 2, nombre: "Este", codigo: "REG-EST", descripcion: "Región este del país", estado: "Activa", sucursales: 3 },
    { id: 3, nombre: "Oeste", codigo: "REG-OST", descripcion: "Región oeste del país", estado: "Inactiva", sucursales: 2 },
    { id: 4, nombre: "Norte", codigo: "REG-NOR", descripcion: "Región norte del país", estado: "Activa", sucursales: 4 },
    { id: 5, nombre: "Sur", codigo: "REG-SUR", descripcion: "Región sur del país", estado: "Activa", sucursales: 2 }
  ]);

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
      // Actualizar región existente
      setRegiones(
        regiones.map((region) =>
          region.id === currentRegionId ? { ...formData, id: currentRegionId, sucursales: region.sucursales } : region
        )
      );
      setIsEditing(false);
      setCurrentRegionId(null);
    } else {
      // Crear nueva región
      const newRegion = {
        id: regiones.length + 1,
        ...formData,
        sucursales: 0
      };
      setRegiones([...regiones, newRegion]);
    }
    // Limpiar formulario
    setFormData({
      nombre: "",
      codigo: "",
      descripcion: "",
      estado: "Activa"
    });
  };

  // Función para editar una región
  const handleEdit = (region) => {
    setFormData({
      nombre: region.nombre,
      codigo: region.codigo,
      descripcion: region.descripcion,
      estado: region.estado
    });
    setIsEditing(true);
    setCurrentRegionId(region.id);
  };

  // Función para eliminar una región
  const handleDelete = (id) => {
    setRegiones(regiones.filter((region) => region.id !== id));
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setFormData({
      nombre: "",
      codigo: "",
      descripcion: "",
      estado: "Activa"
    });
    setIsEditing(false);
    setCurrentRegionId(null);
  };

  // Filtrar regiones basadas en el término de búsqueda
  const filteredRegions = regiones.filter(
    (region) =>
      region.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
     

      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Regiones</h1>
          <div className="header-actions">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === "tabla" ? "active" : ""}`}
                onClick={() => setViewMode("tabla")}
              >
                Tabla
              </button>
              <button 
                className={`view-btn ${viewMode === "tarjetas" ? "active" : ""}`}
                onClick={() => setViewMode("tarjetas")}
              >
                Tarjetas
              </button>
            </div>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar región..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="modulo-form-container">
          <div className="form-header">
            <h2>{isEditing ? "Editar Región" : "Nueva Región"}</h2>
            <FaPlusCircle className="add-icon" />
          </div>
          
          <form className="modulo-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre de la Región</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el nombre de la región"
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
                  placeholder="Ej. REG-CTR"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Descripción breve de la región"
                ></textarea>
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
                </select>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {isEditing ? "Actualizar Región" : "Registrar Región"}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Visualización: Tabla o Tarjetas */}
        {viewMode === "tabla" ? (
          <div className="table-container">
            <h2>Lista de Regiones</h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Sucursales</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegions.length > 0 ? (
                    filteredRegions.map((region) => (
                      <tr key={region.id}>
                        <td>{region.id}</td>
                        <td>{region.nombre}</td>
                        <td><span className="codigo-badge">{region.codigo}</span></td>
                        <td>{region.descripcion}</td>
                        <td>{region.sucursales}</td>
                        <td>
                          <span className={`estado ${region.estado.toLowerCase()}`}>
                            {region.estado}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(region)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(region.id)}
                            disabled={region.sucursales > 0}
                            title={region.sucursales > 0 ? "No se puede eliminar una región con sucursales" : ""}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No se encontraron regiones</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="region-cards">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => (
                <div key={region.id} className="region-card">
                  <div className="region-card-header">
                    <div className="region-title">
                      <h3>{region.nombre}</h3>
                      <span className="codigo-badge">{region.codigo}</span>
                    </div>
                    <span className={`estado-badge ${region.estado.toLowerCase()}`}>
                      {region.estado}
                    </span>
                  </div>
                  
                  <div className="region-card-content">
                    <p className="region-description">{region.descripcion}</p>
                    <div className="region-info">
                      <div className="region-stat">
                        <FaBuilding className="info-icon" />
                        <span>{region.sucursales} sucursales</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="region-card-actions">
                    <button className="btn-card-edit" onClick={() => handleEdit(region)}>
                      <FaEdit /> Editar
                    </button>
                    <button 
                      className="btn-card-delete" 
                      onClick={() => handleDelete(region.id)}
                      disabled={region.sucursales > 0}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No se encontraron regiones</div>
            )}
          </div>
        )}
      </div>

    
    </div>
  );
}

export default ModuloRegiones;