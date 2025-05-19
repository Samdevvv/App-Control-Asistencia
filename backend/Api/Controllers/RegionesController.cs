using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RegionesController : ControllerBase
    {
        private readonly IRegionService _regionService;

        public RegionesController(IRegionService regionService)
        {
            _regionService = regionService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<RegionDTO>>>> GetAll()
        {
            var response = await _regionService.GetAllRegionesAsync();

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<RegionDTO>>> GetById(int id)
        {
            var response = await _regionService.GetRegionByIdAsync(id);

            if (!response.Success)
                return NotFound(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<RegionDTO>>> Create([FromBody] RegionCreateDTO regionDto)
        {
            var response = await _regionService.CreateRegionAsync(regionDto);

            if (!response.Success)
                return BadRequest(response);

            return CreatedAtAction(nameof(GetById), new { id = response.Data.RegionID }, response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public async Task<ActionResult<ApiResponse<RegionDTO>>> Update([FromBody] RegionUpdateDTO regionDto)
        {
            var response = await _regionService.UpdateRegionAsync(regionDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var response = await _regionService.DeleteRegionAsync(id);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}