using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly IEmpleadoService _empleadoService;

        public EmpleadosController(IEmpleadoService empleadoService)
        {
            _empleadoService = empleadoService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<EmpleadoDTO>>>> GetAll()
        {
            var response = await _empleadoService.GetAllEmpleadosAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<EmpleadoDTO>>> GetById(int id)
        {
            var response = await _empleadoService.GetEmpleadoByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [HttpGet("porSucursal/{sucursalId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<EmpleadoDTO>>>> GetBySucursal(int sucursalId)
        {
            var response = await _empleadoService.GetEmpleadosBySucursalAsync(sucursalId);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("porRegion/{regionId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<EmpleadoDTO>>>> GetByRegion(int regionId)
        {
            var response = await _empleadoService.GetEmpleadosByRegionAsync(regionId);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador,Supervisor")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<EmpleadoDTO>>> Create([FromBody] EmpleadoCreateDTO empleadoDto)
        {
            // Asignar el usuario actual como creador si no se especifica
            if (empleadoDto.UsuarioCreacion == 0)
            {
                if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int usuarioId))
                {
                    empleadoDto.UsuarioCreacion = usuarioId;
                }
            }

            var response = await _empleadoService.CreateEmpleadoAsync(empleadoDto);

            if (!response.Success)
                return BadRequest(response);

            return CreatedAtAction(nameof(GetById), new { id = response.Data.EmpleadoID }, response);
        }

        [Authorize(Roles = "Administrador,Supervisor")]
        [HttpPut]
        public async Task<ActionResult<ApiResponse<EmpleadoDTO>>> Update([FromBody] EmpleadoUpdateDTO empleadoDto)
        {
            // Asignar el usuario actual como creador si no se especifica
            if (empleadoDto.UsuarioCreacion == 0)
            {
                if (int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int usuarioId))
                {
                    empleadoDto.UsuarioCreacion = usuarioId;
                }
            }

            var response = await _empleadoService.UpdateEmpleadoAsync(empleadoDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut("cambiarEstado")]
        public async Task<ActionResult<ApiResponse<bool>>> CambiarEstado([FromBody] EmpleadoEstadoDTO estadoDto)
        {
            var response = await _empleadoService.CambiarEstadoEmpleadoAsync(estadoDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}