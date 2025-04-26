import React, { useState, useEffect, useContext } from "react";
import "../estilos/ModuloUsuarios.css";
import {
  FaSearch,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaUserAlt,
} from "react-icons/fa";
import { ModalContext } from "./ModalManager"; // Replace ../contexts/ModalContext

function ModuloUsuarios({ onNavigate, onLogout, activeModule, userInfo }) {
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
    role: "Operator",
    region: "",
    sucursal: "",
    estado: "Activo",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Admin User",
      usuario: "admin",
      email: "admin@ejemplo.com",
      role: "Admin",
      region: "All",
      sucursal: "All",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Supervisor User",
      usuario: "supervisor",
      email: "supervisor@ejemplo.com",
      role: "Supervisor",
      region: "Region A",
      sucursal: "All",
      estado: "Activo",
    },
    {
      id: 3,
      nombre: "Operator User",
      usuario: "operator",
      email: "operator@ejemplo.com",
      role: "Operator",
      region: "Region A",
      sucursal: "Principal",
      estado: "Activo",
    },
  ]);
  const roles = ["Admin", "Supervisor", "Operator"];
  const regiones = ["Region A", "Region B", "Region C"];
  const sucursales = ["Principal", "Sucursal A", "Sucursal B", "Sucursal C"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "role" && value === "Admin"
        ? { region: "All", sucursal: "All" }
        : name === "role" && value === "Supervisor"
        ? { sucursal: "All" }
        : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsuarios(
        usuarios.map((user) =>
          user.id === currentUserId ? { ...formData, id: currentUserId } : user
        )
      );
      showModal("success", "User updated successfully!");
    } else {
      const newUser = {
        id: usuarios.length + 1,
        ...formData,
      };
      setUsuarios([...usuarios, newUser]);
      showModal("success", "User added successfully!");
    }
    setShowFormModal(false);
    setFormData({
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      role: "Operator",
      region: "",
      sucursal: "",
      estado: "Activo",
    });
    setIsEditing(false);
    setCurrentUserId(null);
  };

  const handleEdit = (user) => {
    setFormData({
      nombre: user.nombre,
      usuario: user.usuario,
      email: user.email,
      password: "",
      role: user.role,
      region: user.region,
      sucursal: user.sucursal,
      estado: user.estado,
    });
    setIsEditing(true);
    setCurrentUserId(user.id);
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    showModal("confirmation", "Are you sure you want to delete this user?", () => {
      setUsuarios(usuarios.filter((user) => user.id !== id));
      showModal("success", "User deleted successfully!");
    });
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      role: "Operator",
      region: "",
      sucursal: "",
      estado: "Activo",
    });
    setIsEditing(false);
    setCurrentUserId(null);
    setShowFormModal(false);
  };

  const filteredUsuarios = usuarios.filter(
    (user) =>
      userInfo.role === "Admin" &&
      (user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.estado.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const checkTableScroll = () => {
      const tableContainer = document.querySelector(".table-responsive");
      if (tableContainer) {
        if (tableContainer.scrollWidth > tableContainer.clientWidth) {
          tableContainer.classList.add("has-scroll");
        } else {
          tableContainer.classList.remove("has-scroll");
        }
      }
    };
    checkTableScroll();
    window.addEventListener("resize", checkTableScroll);
    return () => {
      window.removeEventListener("resize", checkTableScroll);
    };
  }, []);

  return (
    <div className="modulo-container">
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

        <div className="table-header">
          <h2>Lista de Usuarios</h2>
          <button className="btn-add" onClick={() => setShowFormModal(true)}>
            <FaPlusCircle className="add-icon" />
            Nuevo Usuario
          </button>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Región</th>
                  <th>Sucursal</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.usuario}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.region}</td>
                      <td>{user.sucursal}</td>
                      <td>
                        <span className={`estado ${user.estado.toLowerCase()}`}>
                          {user.estado}
                        </span>
                      </td>
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
                    <td colSpan="9">No se encontraron usuarios</td>
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
                  <label htmlFor="usuario">Usuario</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese el usuario"
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
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isEditing ? "Dejar en blanco para no cambiar" : "Ingrese la contraseña"}
                    required={!isEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Rol</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.role !== "Admin" && (
                  <div className="form-group">
                    <label htmlFor="region">Región</label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required={formData.role !== "Admin"}
                    >
                      <option value="">Seleccione una región</option>
                      {regiones.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {formData.role === "Operator" && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sucursal">Sucursal</label>
                    <select
                      id="sucursal"
                      name="sucursal"
                      value={formData.sucursal}
                      onChange={handleChange}
                      required={formData.role === "Operator"}
                    >
                      <option value="">Seleccione una sucursal</option>
                      {sucursales.map((sucursal) => (
                        <option key={sucursal} value={sucursal}>
                          {sucursal}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
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
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="btn-submit">
                  {isEditing ? "Actualizar Usuario" : "Agregar Usuario"}
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

export default ModuloUsuarios;