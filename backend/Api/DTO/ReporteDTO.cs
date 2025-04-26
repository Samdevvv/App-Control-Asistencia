namespace DefensoriaAsistencia.Core.DTOs
{
    public class ReporteAsistenciaDTO
    {
        public int AsistenciaID { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? HoraEntrada { get; set; }
        public DateTime? HoraSalida { get; set; }
        public string? EstadoEntrada { get; set; }
        public string? EstadoSalida { get; set; }
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Sucursal { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public string EstadoAsistencia { get; set; } = string.Empty;
        public double HorasTrabajadas { get; set; }
    }

    public class ReporteAusenciaDTO
    {
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Sucursal { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public DateTime FechaAusencia { get; set; }
        public string EstadoAusencia { get; set; } = string.Empty;
    }

    public class ReporteEstadisticaEmpleadoDTO
    {
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Sucursal { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public int TotalAsistencias { get; set; }
        public int EntradasATiempo { get; set; }
        public int EntradasEnTolerancia { get; set; }
        public int EntradasTarde { get; set; }
        public int SalidasCompletas { get; set; }
        public int SalidasEnTolerancia { get; set; }
        public int SalidasTempranas { get; set; }
        public int TotalAusencias { get; set; }
        public int TotalPermisos { get; set; }
        public double PromedioHorasTrabajadas { get; set; }
    }

    public class ReportePuntualidadEmpleadoDTO
    {
        public int EmpleadoID { get; set; }
        public string Cedula { get; set; } = string.Empty;
        public string NombreCompleto { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Sucursal { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public int TotalAsistencias { get; set; }
        public int EntradasATiempo { get; set; }
        public decimal PorcentajePuntualidad { get; set; }
    }

    public class ReporteDashboardDTO
    {
        public int TotalEmpleados { get; set; }
        public int TotalAsistencias { get; set; }
        public EntradasEstadisticaDTO? EntradasEstadistica { get; set; }
        public SalidasEstadisticaDTO? SalidasEstadistica { get; set; }
        public List<AsistenciaDiaSemanaDTO>? AsistenciasPorDiaSemana { get; set; }
        public List<AsistenciaRegionDTO>? AsistenciasPorRegion { get; set; }
        public List<AsistenciaSucursalDTO>? AsistenciasPorSucursal { get; set; }
        public List<ReportePuntualidadEmpleadoDTO>? TopEmpleadosPuntuales { get; set; }
        public List<AsistenciaDepartamentoDTO>? TopDepartamentosPuntuales { get; set; }
        public List<AsistenciaDiaDTO>? AsistenciasPorDia { get; set; }
        public AsistenciaEstadisticaGeneralDTO? EstadisticaGeneral { get; set; }
    }

    public class EntradasEstadisticaDTO
    {
        public int EntradasATiempo { get; set; }
        public int EntradasEnTolerancia { get; set; }
        public int EntradasTarde { get; set; }
    }

    public class SalidasEstadisticaDTO
    {
        public int SalidasCompletas { get; set; }
        public int SalidasEnTolerancia { get; set; }
        public int SalidasTempranas { get; set; }
        public int SinSalidaRegistrada { get; set; }
    }

    public class AsistenciaDiaSemanaDTO
    {
        public int DiaSemana { get; set; }
        public int TotalAsistencias { get; set; }
    }

    public class AsistenciaRegionDTO
    {
        public int RegionID { get; set; }
        public string Region { get; set; } = string.Empty;
        public int TotalAsistencias { get; set; }
    }

    public class AsistenciaSucursalDTO
    {
        public int SucursalID { get; set; }
        public string Sucursal { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public int TotalAsistencias { get; set; }
    }

    public class AsistenciaDepartamentoDTO
    {
        public int DepartamentoID { get; set; }
        public string Departamento { get; set; } = string.Empty;
        public int TotalEmpleados { get; set; }
        public int TotalAsistencias { get; set; }
        public int EntradasATiempo { get; set; }
        public decimal PorcentajePuntualidad { get; set; }
    }

    public class AsistenciaDiaDTO
    {
        public DateTime Fecha { get; set; }
        public int TotalAsistencias { get; set; }
        public int EntradasATiempo { get; set; }
        public int EntradasEnTolerancia { get; set; }
        public int EntradasTarde { get; set; }
        public decimal PorcentajePuntualidad { get; set; }
    }

    public class AsistenciaEstadisticaGeneralDTO
    {
        public int TotalEmpleados { get; set; }
        public int EmpleadosConAsistencia { get; set; }
        public int EmpleadosSinAsistencia { get; set; }
        public int TotalAsistenciasRegistradas { get; set; }
        public int DiasLaborables { get; set; }
        public int AsistenciasEsperadas { get; set; }
        public decimal PorcentajeAsistencia { get; set; }
    }
}