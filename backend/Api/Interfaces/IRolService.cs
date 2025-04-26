using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IRolService
    {
        Task<ApiResponse<IEnumerable<RolDTO>>> GetAllRolesAsync();
        Task<ApiResponse<RolDTO>> GetRolByIdAsync(int id);
        Task<ApiResponse<RolDTO>> CreateRolAsync(RolCreateDTO rolDto);
        Task<ApiResponse<RolDTO>> UpdateRolAsync(RolUpdateDTO rolDto);
        Task<ApiResponse<bool>> DeleteRolAsync(int id);
    }
}