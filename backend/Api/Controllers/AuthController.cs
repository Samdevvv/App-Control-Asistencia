using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DefensoriaAsistencia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<AuthResponseDTO>>> Login([FromBody] LoginDTO loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }
    }
}