namespace DefensoriaAsistencia.Core.DTOs
{
    public class HorarioDTO
    {
        public int HorarioID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public TimeSpan HoraEntrada { get; set; }
        public TimeSpan HoraSalida { get; set; }
        public int ToleranciaEntrada { get; set; }
        public int ToleranciaSalida { get; set; }
        public string? Descripcion { get; set; }
        public bool Estado { get; set; }
    }

    public class HorarioCreateDTO
    {
        public string Nombre { get; set; } = string.Empty;
        public TimeSpan HoraEntrada { get; set; }
        public TimeSpan HoraSalida { get; set; }
        public int ToleranciaEntrada { get; set; }
        public int ToleranciaSalida { get; set; }
        public string? Descripcion { get; set; }
    }

    public class HorarioUpdateDTO
    {
        public int HorarioID { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public TimeSpan HoraEntrada { get; set; }
        public TimeSpan HoraSalida { get; set; }
        public int ToleranciaEntrada { get; set; }
        public int ToleranciaSalida { get; set; }
        public string? Descripcion { get; set; }
    }
}