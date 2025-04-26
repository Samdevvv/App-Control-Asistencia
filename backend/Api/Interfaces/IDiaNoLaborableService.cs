using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IDiaNoLaborableService
    {
        Task<ApiResponse<IEnumerable<DiaNoLaborableDTO>>> GetAllDiasNoLaborablesAsync();
        Task<ApiResponse<IEnumerable<DiaNoLaborableDTO>>> GetDiasNoLaborablesBySucursalAsync(int sucursalId);
        Task<ApiResponse<DiaNoLaborableDTO>> GetDiaNoLaborableByIdAsync(int id);
        Task<ApiResponse<DiaNoLaborableDTO>> CreateDiaNoLaborableAsync(DiaNoLaborableCreateDTO diaNoLaborableDto);
        Task<ApiResponse<DiaNoLaborableDTO>> UpdateDiaNoLaborableAsync(DiaNoLaborableUpdateDTO diaNoLaborableDto);
        Task<ApiResponse<bool>> DeleteDiaNoLaborableAsync(int id);
    }
}