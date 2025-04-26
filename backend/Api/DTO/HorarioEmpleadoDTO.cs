namespace DefensoriaAsistencia.Core.DTOs
{
    public class HorarioEmpleadoDTO
    {
        public int HorarioEmpleadoID { get; set; }
        public int EmpleadoID { get; set; }
        public int HorarioID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }

        // Propiedades de navegación
        public string? NombreEmpleado { get; set; }
        public string? CedulaEmpleado { get; set; }
        public string? NombreHorario { get; set; }
        public string? HoraEntrada { get; set; }
        public string? HoraSalida { get; set; }
        public string? NombreUsuarioCreador { get; set; }
    }

    public class HorarioEmpleadoCreateDTO
    {
        public int EmpleadoID { get; set; }
        public int HorarioID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int UsuarioCreacion { get; set; }
    }

    public class HorarioEmpleadoUpdateDTO
    {
        public int HorarioEmpleadoID { get; set; }
        public int EmpleadoID { get; set; }
        public int HorarioID { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int UsuarioCreacion { get; set; }
    }
}