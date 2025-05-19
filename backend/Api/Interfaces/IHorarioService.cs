using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IHorarioService
    {
        Task<ApiResponse<IEnumerable<HorarioDTO>>> GetAllHorariosAsync();
        Task<ApiResponse<HorarioDTO>> GetHorarioByIdAsync(int id);
        Task<ApiResponse<HorarioDTO>> CreateHorarioAsync(HorarioCreateDTO horarioDto);
        Task<ApiResponse<HorarioDTO>> UpdateHorarioAsync(HorarioUpdateDTO horarioDto);
        Task<ApiResponse<bool>> DeleteHorarioAsync(int id);
    }
}