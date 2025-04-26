namespace DefensoriaAsistencia.Core.DTOs
{
    public class DiaNoLaborableDTO
    {
        public int DiaNoLaborableID { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public bool AplicaTodasSucursales { get; set; }
        public int? SucursalID { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int? UsuarioCreacion { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreSucursal { get; set; }
        public string? NombreUsuarioCreador { get; set; }
    }

    public class DiaNoLaborableCreateDTO
    {
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public bool AplicaTodasSucursales { get; set; }
        public int? SucursalID { get; set; }
        public int UsuarioCreacion { get; set; }
    }

    public class DiaNoLaborableUpdateDTO
    {
        public int DiaNoLaborableID { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; } = string.Empty;
        public bool AplicaTodasSucursales { get; set; }
        public int? SucursalID { get; set; }
        public int UsuarioCreacion { get; set; }
    }
}