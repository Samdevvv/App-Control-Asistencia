import React, { useState } from "react";
import "../estilos/ModuloUsuarios.css";
import { FaUserAlt, FaBuilding, FaMapMarkerAlt, FaUsers, FaFileAlt, FaSearch, FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { MdDashboard, MdFingerprint, MdExitToApp } from "react-icons/md";


function ModuloUsuarios({ onNavigate, onLogout, activeModule }) {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    password: "",
    perfil: "",
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para la tabla de usuarios
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", email: "juan@ejemplo.com", usuario: "jperez", perfil: "Administrador" },
    { id: 2, nombre: "María", apellido: "González", email: "maria@ejemplo.com", usuario: "mgonzalez", perfil: "Supervisor" },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", email: "carlos@ejemplo.com", usuario: "crodriguez", perfil: "Operador" },
    { id: 4, nombre: "Ana", apellido: "Martínez", email: "ana@ejemplo.com", usuario: "amartinez", perfil: "Supervisor" },
    { id: 5, nombre: "Roberto", apellido: "Gómez", email: "roberto@ejemplo.com", usuario: "rgomez", perfil: "Operador" },
  ]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para editar un usuario
  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      usuario: user.usuario,
      password: "", // No mostramos la contraseña por seguridad
      perfil: user.perfil,
    });
    setIsEditing(true);
    setCurrentUserId(user.id);
  };

  // Manejo de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar usuario existente
      setUsuarios(
        usuarios.map((user) =>
          user.id === currentUserId ? { ...formData, id: currentUserId } : user
        )
      );
      setIsEditing(false);
      setCurrentUserId(null);
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: usuarios.length + 1,
        ...formData,
      };
      setUsuarios([...usuarios, newUser]);
    }
    // Limpiar formulario
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      usuario: "",
      password: "",
      perfil: "",
    });
  };

  // Función para eliminar un usuario
  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((user) => user.id !== id));
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      usuario: "",
      password: "",
      perfil: "",
    });
    setIsEditing(false);
    setCurrentUserId(null);
  };

  // Filtrar usuarios basados en el término de búsqueda
  const filteredUsers = usuarios.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.perfil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modulo-container">
     

      {/* Contenido principal */}
      <div className="modulo-content">
        <div className="modulo-header">
          <h1>Gestión de Usuarios</h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="modulo-form-container">
          <div className="form-header">
            <h2>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h2>
            <FaPlusCircle className="add-icon" />
          </div>
          
          <form className="modulo-form" onSubmit={handleSubmit}>
            <div className="form-row">
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
            </div>
            
            <div className="form-row">
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
                <label htmlFor="usuario">Nombre de Usuario</label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Nombre de usuario"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isEditing ? "Deje en blanco para mantener" : "Ingrese contraseña"}
                  required={!isEditing}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="perfil">Perfil de Usuario</label>
                <select
                  id="perfil"
                  name="perfil"
                  value={formData.perfil}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un perfil</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Operador">Operador</option>
                </select>
              </div>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de usuarios */}
        <div className="table-container">
          <h2>Lista de Usuarios</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Usuario</th>
                <th>Perfil</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.email}</td>
                    <td>{user.usuario}</td>
                    <td>{user.perfil}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No se encontraron usuarios</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
}

export default ModuloUsuarios;