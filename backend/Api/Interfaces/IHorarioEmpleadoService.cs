using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IHorarioEmpleadoService
    {
        Task<ApiResponse<IEnumerable<HorarioEmpleadoDTO>>> GetAllHorariosEmpleadosAsync();
        Task<ApiResponse<IEnumerable<HorarioEmpleadoDTO>>> GetHorariosEmpleadosByEmpleadoAsync(int empleadoId);
        Task<ApiResponse<HorarioEmpleadoDTO>> GetHorarioEmpleadoByIdAsync(int id);
        Task<ApiResponse<HorarioEmpleadoDTO>> GetHorarioVigenteEmpleadoAsync(int empleadoId);
        Task<ApiResponse<HorarioEmpleadoDTO>> CreateHorarioEmpleadoAsync(HorarioEmpleadoCreateDTO horarioEmpleadoDto);
        Task<ApiResponse<HorarioEmpleadoDTO>> UpdateHorarioEmpleadoAsync(HorarioEmpleadoUpdateDTO horarioEmpleadoDto);
        Task<ApiResponse<bool>> DeleteHorarioEmpleadoAsync(int id);
    }
}