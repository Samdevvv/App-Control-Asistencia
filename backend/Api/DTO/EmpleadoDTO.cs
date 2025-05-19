namespace DefensoriaAsistencia.Core.DTOs
{
    public class EmpleadoDTO
    {
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public DateTime? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }
        public DateTime FechaIngreso { get; set; }
        public int CargoID { get; set; }
        public int SucursalID { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioCreacion { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreCargo { get; set; }
        public string? NombreSucursal { get; set; }
        public string? NombreRegion { get; set; }
        public string? NombreUsuarioCreador { get; set; }
    }

    public class EmpleadoCreateDTO
    {
        public string Cedula { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public DateTime? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }
        public DateTime FechaIngreso { get; set; }
        public int CargoID { get; set; }
        public int SucursalID { get; set; }
        public byte[]? HuellaDigital { get; set; }
        public int UsuarioCreacion { get; set; }
    }

    public class EmpleadoUpdateDTO
    {
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public DateTime? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }
        public DateTime FechaIngreso { get; set; }
        public int CargoID { get; set; }
        public int SucursalID { get; set; }
        public byte[]? HuellaDigital { get; set; }
        public int UsuarioCreacion { get; set; }
    }

    public class EmpleadoEstadoDTO
    {
        public int EmpleadoID { get; set; }
        public bool Estado { get; set; }
    }
}