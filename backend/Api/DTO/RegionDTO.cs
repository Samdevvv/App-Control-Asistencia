namespace DefensoriaAsistencia.Core.DTOs
{
    public class RegionDTO
    {
        public int RegionID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool Estado { get; set; }
    }

    public class RegionCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
    }

    public class RegionUpdateDTO
    {
        public int RegionID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
    }
}