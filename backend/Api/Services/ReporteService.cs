using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;

namespace DefensoriaAsistencia.Core.Services
{
    public class ReporteService : IReporteService
    {
        private readonly IReporteRepository _reporteRepository;

        public ReporteService(IReporteRepository reporteRepository)
        {
            _reporteRepository = reporteRepository;
        }

        public async Task<ApiResponse<IEnumerable<ReporteAsistenciaDTO>>> GetReporteAsistenciasPorPeriodoAsync(AsistenciaFiltroDTO filtroDto)
        {
            try
            {
                if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
                {
                    return ApiResponse<IEnumerable<ReporteAsistenciaDTO>>.Fail("Las fechas de inicio y fin son requeridas.");
                }

                // Si la fecha de fin es anterior a la fecha de inicio, invertir
                if (filtroDto.FechaFin < filtroDto.FechaInicio)
                {
                    var temp = filtroDto.FechaInicio;
                    filtroDto.FechaInicio = filtroDto.FechaFin;
                    filtroDto.FechaFin = temp;
                }

                var reporte = await _reporteRepository.GetReporteAsistenciasPorPeriodoAsync(
                    filtroDto.FechaInicio.Value,
                    filtroDto.FechaFin.Value,
                    filtroDto.SucursalID,
                    filtroDto.RegionID,
                    filtroDto.EmpleadoID);

                return ApiResponse<IEnumerable<ReporteAsistenciaDTO>>.Ok(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ReporteAsistenciaDTO>>.Fail($"Error al generar el reporte de asistencias: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>> GetTopEmpleadosPuntualesAsync(AsistenciaFiltroDTO filtroDto)
        {
            try
            {
                if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
                {
                    return ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>.Fail("Las fechas de inicio y fin son requeridas.");
                }

                // Si la fecha de fin es anterior a la fecha de inicio, invertir
                if (filtroDto.FechaFin < filtroDto.FechaInicio)
                {
                    var temp = filtroDto.FechaInicio;
                    filtroDto.FechaInicio = filtroDto.FechaFin;
                    filtroDto.FechaFin = temp;
                }

                var reporte = await _reporteRepository.GetTopEmpleadosPuntualesAsync(
                    filtroDto.FechaInicio.Value,
                    filtroDto.FechaFin.Value,
                    filtroDto.SucursalID,
                    filtroDto.RegionID);

                return ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>.Ok(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>.Fail(
                    $"Error al generar el reporte de top empleados puntuales: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<ReporteAusenciaDTO>>> GetReporteAusenciasPorPeriodoAsync(AsistenciaFiltroDTO filtroDto)
        {
            try
            {
                if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
                {
                    return ApiResponse<IEnumerable<ReporteAusenciaDTO>>.Fail("Las fechas de inicio y fin son requeridas.");
                }

                // Si la fecha de fin es anterior a la fecha de inicio, invertir
                if (filtroDto.FechaFin < filtroDto.FechaInicio)
                {
                    var temp = filtroDto.FechaInicio;
                    filtroDto.FechaInicio = filtroDto.FechaFin;
                    filtroDto.FechaFin = temp;
                }

                var reporte = await _reporteRepository.GetReporteAusenciasPorPeriodoAsync(
                    filtroDto.FechaInicio.Value,
                    filtroDto.FechaFin.Value,
                    filtroDto.SucursalID,
                    filtroDto.RegionID);

                return ApiResponse<IEnumerable<ReporteAusenciaDTO>>.Ok(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ReporteAusenciaDTO>>.Fail(
                    $"Error al generar el reporte de ausencias: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>> GetReporteEstadisticasAsistenciaPorEmpleadoAsync(AsistenciaFiltroDTO filtroDto)
        {
            try
            {
                if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
                {
                    return ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>.Fail("Las fechas de inicio y fin son requeridas.");
                }

                // Si la fecha de fin es anterior a la fecha de inicio, invertir
                if (filtroDto.FechaFin < filtroDto.FechaInicio)
                {
                    var temp = filtroDto.FechaInicio;
                    filtroDto.FechaInicio = filtroDto.FechaFin;
                    filtroDto.FechaFin = temp;
                }

                var reporte = await _reporteRepository.GetReporteEstadisticasAsistenciaPorEmpleadoAsync(
                    filtroDto.FechaInicio.Value,
                    filtroDto.FechaFin.Value,
                    filtroDto.EmpleadoID,
                    filtroDto.SucursalID,
                    filtroDto.RegionID);

                return ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>.Ok(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>.Fail(
                    $"Error al generar el reporte de estadísticas por empleado: {ex.Message}");
            }
        }

        public async Task<ApiResponse<ReporteDashboardDTO>> GetReporteDashboardAsync(AsistenciaFiltroDTO filtroDto)
        {
            try
            {
                if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
                {
                    return ApiResponse<ReporteDashboardDTO>.Fail("Las fechas de inicio y fin son requeridas.");
                }

                // Si la fecha de fin es anterior a la fecha de inicio, invertir
                if (filtroDto.FechaFin < filtroDto.FechaInicio)
                {
                    var temp = filtroDto.FechaInicio;
                    filtroDto.FechaInicio = filtroDto.FechaFin;
                    filtroDto.FechaFin = temp;
                }

                var reporte = await _reporteRepository.GetReporteDashboardAsync(
                    filtroDto.FechaInicio.Value,
                    filtroDto.FechaFin.Value,
                    filtroDto.SucursalID,
                    filtroDto.RegionID);

                return ApiResponse<ReporteDashboardDTO>.Ok(reporte);
            }
            catch (Exception ex)
            {
                return ApiResponse<ReporteDashboardDTO>.Fail(
                    $"Error al generar el reporte de dashboard: {ex.Message}");
            }
        }
    }
}