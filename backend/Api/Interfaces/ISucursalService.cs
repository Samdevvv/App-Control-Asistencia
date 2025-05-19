using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ISucursalService
    {
        Task<ApiResponse<IEnumerable<SucursalDTO>>> GetAllSucursalesAsync();
        Task<ApiResponse<IEnumerable<SucursalDTO>>> GetSucursalesByRegionAsync(int regionId);
        Task<ApiResponse<SucursalDTO>> GetSucursalByIdAsync(int id);
        Task<ApiResponse<SucursalDTO>> CreateSucursalAsync(SucursalCreateDTO sucursalDto);
        Task<ApiResponse<SucursalDTO>> UpdateSucursalAsync(SucursalUpdateDTO sucursalDto);
        Task<ApiResponse<bool>> DeleteSucursalAsync(int id);
    }
}