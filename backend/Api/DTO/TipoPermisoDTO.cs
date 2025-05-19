namespace DefensoriaAsistencia.Core.DTOs
{
    public class TipoPermisoDTO
    {
        public int TipoPermisoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool RequiereJustificacion { get; set; }
        public bool AfectaSalario { get; set; }
        public bool Estado { get; set; }
    }

    public class TipoPermisoCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool RequiereJustificacion { get; set; }
        public bool AfectaSalario { get; set; }
    }

    public class TipoPermisoUpdateDTO
    {
        public int TipoPermisoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool RequiereJustificacion { get; set; }
        public bool AfectaSalario { get; set; }
    }
}
