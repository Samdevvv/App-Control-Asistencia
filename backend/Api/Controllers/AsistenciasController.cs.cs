using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AsistenciasController : ControllerBase
    {
        private readonly IAsistenciaService _asistenciaService;

        public AsistenciasController(IAsistenciaService asistenciaService)
        {
            _asistenciaService = asistenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<AsistenciaDTO>>>> GetAll()
        {
            var response = await _asistenciaService.GetAllAsistenciasAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<AsistenciaDTO>>> GetById(int id)
        {
            var response = await _asistenciaService.GetAsistenciaByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [HttpGet("porEmpleado/{empleadoId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AsistenciaDTO>>>> GetByEmpleado(int empleadoId)
        {
            var response = await _asistenciaService.GetAsistenciasByEmpleadoAsync(empleadoId);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("porFecha")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AsistenciaDTO>>>> GetByFecha([FromQuery] DateTime fecha)
        {
            var response = await _asistenciaService.GetAsistenciasByFechaAsync(fecha);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("porRangoFechas")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AsistenciaDTO>>>> GetByRangoFechas(
            [FromQuery] DateTime fechaInicio, [FromQuery] DateTime fechaFin)
        {
            var response = await _asistenciaService.GetAsistenciasByRangoFechasAsync(fechaInicio, fechaFin);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<ApiResponse<AsistenciaDTO>>> RegistrarAsistencia([FromBody] AsistenciaRegistroDTO registroDto)
        {
            var response = await _asistenciaService.RegistrarAsistenciaAsync(registroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador,Supervisor")]
        [HttpPost("registrarManual")]
        public async Task<ActionResult<ApiResponse<AsistenciaDTO>>> RegistrarAsistenciaManual([FromBody] AsistenciaManualDTO asistenciaDto)
        {
            var response = await _asistenciaService.RegistrarAsistenciaManualAsync(asistenciaDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}