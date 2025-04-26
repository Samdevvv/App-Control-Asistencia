using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SucursalesController : ControllerBase
    {
        private readonly ISucursalService _sucursalService;

        public SucursalesController(ISucursalService sucursalService)
        {
            _sucursalService = sucursalService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<SucursalDTO>>>> GetAll()
        {
            var response = await _sucursalService.GetAllSucursalesAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<SucursalDTO>>> GetById(int id)
        {
            var response = await _sucursalService.GetSucursalByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [HttpGet("porRegion/{regionId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SucursalDTO>>>> GetByRegion(int regionId)
        {
            var response = await _sucursalService.GetSucursalesByRegionAsync(regionId);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<SucursalDTO>>> Create([FromBody] SucursalCreateDTO sucursalDto)
        {
            var response = await _sucursalService.CreateSucursalAsync(sucursalDto);

            if (!response.Success)
                return BadRequest(response);

            return CreatedAtAction(nameof(GetById), new { id = response.Data.SucursalID }, response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public async Task<ActionResult<ApiResponse<SucursalDTO>>> Update([FromBody] SucursalUpdateDTO sucursalDto)
        {
            var response = await _sucursalService.UpdateSucursalAsync(sucursalDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _sucursalService.DeleteSucursalAsync(id);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}