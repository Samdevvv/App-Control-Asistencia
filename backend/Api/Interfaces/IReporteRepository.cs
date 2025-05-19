using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IReporteRepository
    {
        Task<IEnumerable<ReporteAsistenciaDTO>> GetReporteAsistenciasPorPeriodoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null,
            int? regionId = null, int? empleadoId = null);

        Task<IEnumerable<ReportePuntualidadEmpleadoDTO>> GetTopEmpleadosPuntualesAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null);

        Task<IEnumerable<ReporteAusenciaDTO>> GetReporteAusenciasPorPeriodoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null);

        Task<IEnumerable<ReporteEstadisticaEmpleadoDTO>> GetReporteEstadisticasAsistenciaPorEmpleadoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? empleadoId = null,
            int? sucursalId = null, int? regionId = null);

        Task<ReporteDashboardDTO> GetReporteDashboardAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null);
    }
}