namespace DefensoriaAsistencia.Core.DTOs
{
    public class SucursalDTO
    {
        public int SucursalID { get; set; }
        public int RegionID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string? Telefono { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreRegion { get; set; }
    }

    public class SucursalCreateDTO
    {
        public int RegionID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string? Telefono { get; set; }
    }

    public class SucursalUpdateDTO
    {
        public int SucursalID { get; set; }
        public int RegionID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string? Telefono { get; set; }
    }
}