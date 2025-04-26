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
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuariosController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<ApiResponse<IEnumerable<UsuarioDTO>>>> GetAll()
        {
            var response = await _usuarioService.GetAllUsuariosAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<UsuarioDTO>>> GetById(int id)
        {
            // Verificar si el usuario actual está intentando acceder a sus propios datos
            // o si tiene rol de administrador para acceder a datos de otros usuarios
            var usuarioIdActual = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var rolActual = User.FindFirstValue(ClaimTypes.Role);

            if (id.ToString() != usuarioIdActual && rolActual != "Administrador")
            {
                return Forbid();
            }

            var response = await _usuarioService.GetUsuarioByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<ApiResponse<UsuarioDTO>>> Create([FromBody] UsuarioCreateDTO usuarioDto)
        {
            var response = await _usuarioService.CreateUsuarioAsync(usuarioDto);

            if (!response.Success)
                return BadRequest(response);

            return CreatedAtAction(nameof(GetById), new { id = response.Data.UsuarioID }, response);
        }

        [HttpPut]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<ApiResponse<UsuarioDTO>>> Update([FromBody] UsuarioUpdateDTO usuarioDto)
        {
            var response = await _usuarioService.UpdateUsuarioAsync(usuarioDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _usuarioService.DeleteUsuarioAsync(id);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPut("cambiarContrasena")]
        public async Task<ActionResult<ApiResponse<bool>>> CambiarContrasena([FromBody] CambioContrasenaDTO cambioDto)
        {
            // Verificar si el usuario actual está intentando cambiar su propia contraseña
            // o si tiene rol de administrador para cambiar contraseñas de otros usuarios
            var usuarioIdActual = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var rolActual = User.FindFirstValue(ClaimTypes.Role);

            if (cambioDto.UsuarioID.ToString() != usuarioIdActual && rolActual != "Administrador")
            {
                return Forbid();
            }

            var response = await _usuarioService.CambiarContrasenaAsync(cambioDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}