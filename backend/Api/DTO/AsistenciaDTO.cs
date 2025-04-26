namespace DefensoriaAsistencia.Core.DTOs
{
    public class AsistenciaDTO
    {
        public int AsistenciaID { get; set; }
        public int EmpleadoID { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? HoraEntrada { get; set; }
        public DateTime? HoraSalida { get; set; }
        public string? EstadoEntrada { get; set; }
        public string? EstadoSalida { get; set; }
        public string? Observaciones { get; set; }

        // Propiedades de navegación
        public string? NombreEmpleado { get; set; }
        public string? CedulaEmpleado { get; set; }
        public string? CargoEmpleado { get; set; }
        public string? SucursalEmpleado { get; set; }
    }

    public class AsistenciaRegistroDTO
    {
        public int EmpleadoID { get; set; }
        public byte[]? HuellaDigital { get; set; }
    }

    public class AsistenciaManualDTO
    {
        public int EmpleadoID { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? HoraEntrada { get; set; }
        public DateTime? HoraSalida { get; set; }
        public string? Observaciones { get; set; }
    }

    public class AsistenciaFiltroDTO
    {
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int? SucursalID { get; set; }
        public int? RegionID { get; set; }
        public int? EmpleadoID { get; set; }
    }
}