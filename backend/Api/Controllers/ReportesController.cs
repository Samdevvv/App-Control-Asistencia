using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportesController : ControllerBase
    {
        private readonly IReporteService _reporteService;

        public ReportesController(IReporteService reporteService)
        {
            _reporteService = reporteService;
        }

        [HttpGet("asistencias")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReporteAsistenciaDTO>>>> GetReporteAsistencias([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            var response = await _reporteService.GetReporteAsistenciasPorPeriodoAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("topEmpleadosPuntuales")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>>> GetTopEmpleadosPuntuales([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            var response = await _reporteService.GetTopEmpleadosPuntualesAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("ausencias")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReporteAusenciaDTO>>>> GetReporteAusencias([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            var response = await _reporteService.GetReporteAusenciasPorPeriodoAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("estadisticasEmpleado")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>>> GetEstadisticasEmpleado([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            var response = await _reporteService.GetReporteEstadisticasAsistenciaPorEmpleadoAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult<ApiResponse<ReporteDashboardDTO>>> GetDashboard([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            var response = await _reporteService.GetReporteDashboardAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}