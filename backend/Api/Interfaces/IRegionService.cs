using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IRegionService
    {
        Task<ApiResponse<IEnumerable<RegionDTO>>> GetAllRegionesAsync();
        Task<ApiResponse<RegionDTO>> GetRegionByIdAsync(int id);
        Task<ApiResponse<RegionDTO>> CreateRegionAsync(RegionCreateDTO regionDto);
        Task<ApiResponse<RegionDTO>> UpdateRegionAsync(RegionUpdateDTO regionDto);
        Task<ApiResponse<bool>> DeleteRegionAsync(int id);
    }
}