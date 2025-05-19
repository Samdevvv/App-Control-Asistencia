using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IReporteService
    {
        Task<ApiResponse<IEnumerable<ReporteAsistenciaDTO>>> GetReporteAsistenciasPorPeriodoAsync(AsistenciaFiltroDTO filtroDto);
        Task<ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>> GetTopEmpleadosPuntualesAsync(AsistenciaFiltroDTO filtroDto);
        Task<ApiResponse<IEnumerable<ReporteAusenciaDTO>>> GetReporteAusenciasPorPeriodoAsync(AsistenciaFiltroDTO filtroDto);
        Task<ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>> GetReporteEstadisticasAsistenciaPorEmpleadoAsync(AsistenciaFiltroDTO filtroDto);
        Task<ApiResponse<ReporteDashboardDTO>> GetReporteDashboardAsync(AsistenciaFiltroDTO filtroDto);
    }
}