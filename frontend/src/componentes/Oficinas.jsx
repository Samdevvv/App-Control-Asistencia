import React, { useState, useEffect } from "react";
import "../estilos/Oficinas.css";
import { FaSearch, FaPlusCircle, FaEdit, FaTrash, FaBuilding } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

function Oficinas({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    sucursal: "",
    ubicacion: "",
    estado: "Activa"
  });

  // Estado para controlar el modo de edición y modal
  const [isEditing, setIsEditing] = useState(false);
  const [currentOfficeId, setCurrentOfficeId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para la visualización (tabla o tarjetas)
  const [viewMode, setViewMode] = useState("tabla");
  
  // Estado para animaciones
  const [animatedItemId, setAnimatedItemId] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState(""); // "add", "edit", "delete"

  // Datos de ejemplo para la tabla de oficinas
  const [oficinas, setOficinas] = useState([
    { id: 1, nombre: "Oficina Principal", codigo: "OF-A01", sucursal: "Sucursal Principal", ubicacion: "Piso 1", estado: "Activa" },
    { id: 2, nombre: "Oficina Desarrollo", codigo: "OF-B02", sucursal: "Sucursal Este", ubicacion: "Piso 2", estado: "Activa" },
    { id: 3, nombre: "Oficina Ventas", codigo: "OF-C03", sucursal: "Sucursal Oeste", ubicacion: "Piso 3", estado: "Inactiva" },
    { id: 4, nombre: "Oficina RRHH", codigo: "OF-D04", sucursal: "Sucursal Norte", ubicacion: "Piso 1", estado: "Activa" },
    { id: 5, nombre: "Oficina Finanzas", codigo: "OF-E05", sucursal: "Sucursal Principal", ubicacion: "Piso 4", estado: "Activa" }
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
      estado: office.estado
    });
    setIsEditing(true);
    setCurrentOfficeId(office.id);
    setShowFormModal(true);
  };

  // Manejo de envío del formulario con animación
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar oficina existente
      setOficinas(
        oficinas.map((office) =>
          office.id === currentOfficeId ? { ...formData, id: currentOfficeId } : office
        )
      );
      setIsEditing(false);
      setCurrentOfficeId(null);
      
      // Mostrar animación de edición
      setAnimatedItemId(currentOfficeId);
      setAnimationType("edit");
      setShowAnimation(true);
    } else {
      // Crear nueva oficina
      const newOffice = {
        id: oficinas.length + 1,
        ...formData
      };
      setOficinas([...oficinas, newOffice]);
      
      // Mostrar animación de adición
      setAnimatedItemId(newOffice.id);
      setAnimationType("add");
      setShowAnimation(true);
    }
    
    // Cerrar modal y limpiar formulario
    setShowFormModal(false);
    setFormData({
      nombre: "",
      codigo: "",
      sucursal: "",
      ubicacion: "",
      estado: "Activa"
    });
    
    // Desactivar la animación después de un tiempo
    setTimeout(() => {
      setShowAnimation(false);
      setAnimatedItemId(null);
      setAnimationType("");
    }, 1500);
  };

  // Función para eliminar una oficina con animación
  const handleDelete = (id) => {
    // Primero marcar para animación de eliminación
    setAnimatedItemId(id);
    setAnimationType("delete");
    setShowAnimation(true);
    
    // Después de la animación, eliminar el elemento
    setTimeout(() => {
      setOficinas(oficinas.filter((office) => office.id !== id));
      setShowAnimation(false);
      setAnimatedItemId(null);
      setAnimationType("");
    }, 500);
  };

  // Función para cerrar el modal y cancelar
  const handleCancel = () => {
    setFormData({
      nombre: "",
      codigo: "",
      sucursal: "",
      ubicacion: "",
      estado: "Activa"
    });
    setIsEditing(false);
    setCurrentOfficeId(null);
    setShowFormModal(false);
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

  // Aplicar clase de animación según tipo
  const getAnimationClass = (id) => {
    if (animatedItemId === id && showAnimation) {
      if (animationType === "add") return "add-animation";
      if (animationType === "edit") return "edit-animation";
      if (animationType === "delete") return "delete-animation";
    }
    return "";
  };

  return (
    <div className="modulo-container">
      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header animated-fade-in">
          <h1>Gestión de Oficinas</h1>
          <div className="header-actions">
            <div className="view-toggle animated-slide-in">
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
            <div className="search-container animated-slide-in">
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
        </div>

        {/* Botón de Nueva Oficina */}
        <div className="table-header animated-zoom-in">
          <h2>Lista de Oficinas</h2>
          <button className="btn-add pulse-animation" onClick={() => setShowFormModal(true)}>
            <FaPlusCircle className="add-icon" />
            Nueva Oficina
          </button>
        </div>

        {/* Visualización: Tabla o Tarjetas */}
        {viewMode === "tabla" ? (
          <div className="table-container animated-zoom-in">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Sucursal</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffices.length > 0 ? (
                    filteredOffices.map((office) => (
                      <tr 
                        key={office.id} 
                        data-id={office.id}
                        className={getAnimationClass(office.id)}
                      >
                        <td>{office.id}</td>
                        <td>{office.nombre}</td>
                        <td><span className="codigo-badge">{office.codigo}</span></td>
                        <td>{office.sucursal}</td>
                        <td>{office.ubicacion}</td>
                        <td>
                          <span className={`estado ${office.estado.toLowerCase().replace(/\s+/g, '-')}`}>
                            {office.estado}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="btn-edit btn-hover-effect"
                            onClick={() => handleEdit(office)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-delete btn-hover-effect"
                            onClick={() => handleDelete(office.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No se encontraron oficinas</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="office-cards animated-stagger">
            {filteredOffices.length > 0 ? (
              filteredOffices.map((office, index) => (
                <div 
                  key={office.id} 
                  data-id={office.id}
                  className={`office-card card-stagger-${index % 3} ${getAnimationClass(office.id)}`}
                >
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
                      <div className="info-item animated-item">
                        <FaBuilding className="info-icon" />
                        <span>{office.sucursal}</span>
                      </div>
                      <div className="info-item animated-item">
                        <MdLocationOn className="info-icon" />
                        <span>{office.ubicacion}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="office-card-actions">
                    <button className="btn-card-edit btn-hover-scale" onClick={() => handleEdit(office)}>
                      <FaEdit /> Editar
                    </button>
                    <button 
                      className="btn-card-delete btn-hover-scale" 
                      onClick={() => handleDelete(office.id)}
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
        )}

        {/* Modal para formulario de oficina */}
        {showFormModal && (
          <div className="modal-overlay animated-fade-in">
            <div className="form-modal animated-pop-in">
              <div className="form-header">
                <h2>{isEditing ? "Editar Oficina" : "Nueva Oficina"}</h2>
                <FaPlusCircle className="add-icon rotating-icon" />
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
                      className="input-animation"
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
                      className="input-animation"
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
                      className="select-animation"
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
                      className="input-animation"
                    />
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
                      className="select-animation"
                    >
                      <option value="Activa">Activa</option>
                      <option value="Inactiva">Inactiva</option>
                      <option value="En Mantenimiento">En Mantenimiento</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="btn-submit btn-hover-scale">
                    {isEditing ? "Actualizar Oficina" : "Registrar Oficina"}
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
    </div>
  );
}

export default Oficinas;