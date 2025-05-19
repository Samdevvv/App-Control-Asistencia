using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IJustificacionAsistenciaService
    {
        Task<ApiResponse<IEnumerable<JustificacionAsistenciaDTO>>> GetAllJustificacionesAsync();
        Task<ApiResponse<IEnumerable<JustificacionAsistenciaDTO>>> GetJustificacionesByAsistenciaAsync(int asistenciaId);
        Task<ApiResponse<JustificacionAsistenciaDTO>> GetJustificacionByIdAsync(int id);
        Task<ApiResponse<JustificacionAsistenciaDTO>> CreateJustificacionAsync(JustificacionAsistenciaCreateDTO justificacionDto);
        Task<ApiResponse<JustificacionAsistenciaDTO>> UpdateJustificacionAsync(JustificacionAsistenciaUpdateDTO justificacionDto);
        Task<ApiResponse<bool>> DeleteJustificacionAsync(int id);
    }
}