namespace DefensoriaAsistencia.Core.DTOs
{
    public class UsuarioDTO
    {
        public int UsuarioID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string NombreUsuario { get; set; } = string.Empty;
        public string? Email { get; set; }
        public int RolID { get; set; }
        public int SucursalID { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? UltimoAcceso { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreRol { get; set; }
        public string? NombreSucursal { get; set; }
    }

    public class UsuarioCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string NombreUsuario { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
        public string? Email { get; set; }
        public int RolID { get; set; }
        public int SucursalID { get; set; }
    }

    public class UsuarioUpdateDTO
    {
        public int UsuarioID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string NombreUsuario { get; set; } = string.Empty;
        public string? Contrasena { get; set; }
        public string? Email { get; set; }
        public int RolID { get; set; }
        public int SucursalID { get; set; }
    }

    public class CambioContrasenaDTO
    {
        public int UsuarioID { get; set; }
        public string ContrasenaActual { get; set; } = string.Empty;
        public string ContrasenaNueva { get; set; } = string.Empty;
    }

    public class LoginDTO
    {
        public string NombreUsuario { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
    }

    public class AuthResponseDTO
    {
        public int UsuarioID { get; set; }
        public string NombreUsuario { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Rol { get; set; } = string.Empty;
        public string Sucursal { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public DateTime Expiracion { get; set; }
    }
}
