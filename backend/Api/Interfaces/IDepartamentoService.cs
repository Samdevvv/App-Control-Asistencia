using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IDepartamentoService
    {
        Task<ApiResponse<IEnumerable<DepartamentoDTO>>> GetAllDepartamentosAsync();
        Task<ApiResponse<DepartamentoDTO>> GetDepartamentoByIdAsync(int id);
        Task<ApiResponse<DepartamentoDTO>> CreateDepartamentoAsync(DepartamentoCreateDTO departamentoDto);
        Task<ApiResponse<DepartamentoDTO>> UpdateDepartamentoAsync(DepartamentoUpdateDTO departamentoDto);
        Task<ApiResponse<bool>> DeleteDepartamentoAsync(int id);
    }
}