using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<AuthResponseDTO>> LoginAsync(LoginDTO loginDto);
    }
}