using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IEmpleadoService
    {
        Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetAllEmpleadosAsync();
        Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetEmpleadosBySucursalAsync(int sucursalId);
        Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetEmpleadosByRegionAsync(int regionId);
        Task<ApiResponse<EmpleadoDTO>> GetEmpleadoByIdAsync(int id);
        Task<ApiResponse<EmpleadoDTO>> CreateEmpleadoAsync(EmpleadoCreateDTO empleadoDto);
        Task<ApiResponse<EmpleadoDTO>> UpdateEmpleadoAsync(EmpleadoUpdateDTO empleadoDto);
        Task<ApiResponse<bool>> CambiarEstadoEmpleadoAsync(EmpleadoEstadoDTO estadoDto);
    }
}
