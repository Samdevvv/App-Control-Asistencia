namespace DefensoriaAsistencia.Core.DTOs
{
    public class DepartamentoDTO
    {
        public int DepartamentoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool Estado { get; set; }
    }

    public class DepartamentoCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
    }

    public class DepartamentoUpdateDTO
    {
        public int DepartamentoID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
    }
}
