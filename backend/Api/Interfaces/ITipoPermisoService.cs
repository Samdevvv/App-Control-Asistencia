using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ITipoPermisoService
    {
        Task<ApiResponse<IEnumerable<TipoPermisoDTO>>> GetAllTiposPermisosAsync();
        Task<ApiResponse<TipoPermisoDTO>> GetTipoPermisoByIdAsync(int id);
        Task<ApiResponse<TipoPermisoDTO>> CreateTipoPermisoAsync(TipoPermisoCreateDTO tipoPermisoDto);
        Task<ApiResponse<TipoPermisoDTO>> UpdateTipoPermisoAsync(TipoPermisoUpdateDTO tipoPermisoDto);
        Task<ApiResponse<bool>> DeleteTipoPermisoAsync(int id);
    }
}