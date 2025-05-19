namespace DefensoriaAsistencia.Core.DTOs
{
    public class CargoDTO
    {
        public int CargoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public int DepartamentoID { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreDepartamento { get; set; }
    }

    public class CargoCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public int DepartamentoID { get; set; }
    }

    public class CargoUpdateDTO
    {
        public int CargoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public int DepartamentoID { get; set; }
    }
}