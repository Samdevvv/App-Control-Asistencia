using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IRolService _rolService;

        public RolesController(IRolService rolService)
        {
            _rolService = rolService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<RolDTO>>>> GetAll()
        {
            var response = await _rolService.GetAllRolesAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<RolDTO>>> GetById(int id)
        {
            var response = await _rolService.GetRolByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<RolDTO>>> Create([FromBody] RolCreateDTO rolDto)
        {
            var response = await _rolService.CreateRolAsync(rolDto);

            if (!response.Success)
                return BadRequest(response);

            return CreatedAtAction(nameof(GetById), new { id = response.Data.RolID }, response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public async Task<ActionResult<ApiResponse<RolDTO>>> Update([FromBody] RolUpdateDTO rolDto)
        {
            var response = await _rolService.UpdateRolAsync(rolDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _rolService.DeleteRolAsync(id);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}