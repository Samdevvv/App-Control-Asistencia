using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IPermisoService
    {
        Task<ApiResponse<IEnumerable<PermisoDTO>>> GetAllPermisosAsync();
        Task<ApiResponse<IEnumerable<PermisoDTO>>> GetPermisosByEmpleadoAsync(int empleadoId);
        Task<ApiResponse<IEnumerable<PermisoDTO>>> GetPermisosByFechaAsync(DateTime fecha);
        Task<ApiResponse<IEnumerable<PermisoDTO>>> GetPermisosByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
        Task<ApiResponse<PermisoDTO>> GetPermisoByIdAsync(int id);
        Task<ApiResponse<PermisoDTO>> CreatePermisoAsync(PermisoCreateDTO permisoDto);
        Task<ApiResponse<PermisoDTO>> UpdatePermisoAsync(PermisoUpdateDTO permisoDto);
        Task<ApiResponse<bool>> DeletePermisoAsync(int id);
    }
}