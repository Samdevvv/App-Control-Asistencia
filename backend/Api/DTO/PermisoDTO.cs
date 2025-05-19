namespace DefensoriaAsistencia.Core.DTOs
{
    public class PermisoDTO
    {
        public int PermisoID { get; set; }
        public int EmpleadoID { get; set; }
        public int TipoPermisoID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string? Justificacion { get; set; }
        public string? DocumentoJustificacion { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }
        public string? Comentarios { get; set; }

        // Propiedades de navegación
        public string? NombreEmpleado { get; set; }
        public string? CedulaEmpleado { get; set; }
        public string? NombreTipoPermiso { get; set; }
        public string? NombreUsuarioCreador { get; set; }
    }

    public class PermisoCreateDTO
    {
        public int EmpleadoID { get; set; }
        public int TipoPermisoID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string? Justificacion { get; set; }
        public string? DocumentoJustificacion { get; set; }
        public int UsuarioCreacion { get; set; }
        public string? Comentarios { get; set; }
    }

    public class PermisoUpdateDTO
    {
        public int PermisoID { get; set; }
        public int EmpleadoID { get; set; }
        public int TipoPermisoID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string? Justificacion { get; set; }
        public string? DocumentoJustificacion { get; set; }
        public int UsuarioCreacion { get; set; }
        public bool Estado { get; set; }
        public string? Comentarios { get; set; }
    }
}