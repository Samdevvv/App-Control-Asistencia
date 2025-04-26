namespace DefensoriaAsistencia.Core.DTOs
{
    public class JustificacionAsistenciaDTO
    {
        public int JustificacionID { get; set; }
        public int AsistenciaID { get; set; }
        public string Justificacion { get; set; } = string.Empty;
        public string? DocumentoJustificacion { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }
        public string? Comentarios { get; set; }

        // Propiedades de navegación
        public int? EmpleadoID { get; set; }
        public string? NombreEmpleado { get; set; }
        public DateTime? FechaAsistencia { get; set; }
        public string? NombreUsuarioCreador { get; set; }
    }

    public class JustificacionAsistenciaCreateDTO
    {
        public int AsistenciaID { get; set; }
        public string Justificacion { get; set; } = string.Empty;
        public string? DocumentoJustificacion { get; set; }
        public int UsuarioCreacion { get; set; }
        public string? Comentarios { get; set; }
    }

    public class JustificacionAsistenciaUpdateDTO
    {
        public int JustificacionID { get; set; }
        public int AsistenciaID { get; set; }
        public string Justificacion { get; set; } = string.Empty;
        public string? DocumentoJustificacion { get; set; }
        public int UsuarioCreacion { get; set; }
        public bool Estado { get; set; }
        public string? Comentarios { get; set; }
    }
}