using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IAsistenciaService
    {
        Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAllAsistenciasAsync();
        Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByEmpleadoAsync(int empleadoId);
        Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByFechaAsync(DateTime fecha);
        Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
        Task<ApiResponse<AsistenciaDTO>> GetAsistenciaByIdAsync(int id);
        Task<ApiResponse<AsistenciaDTO>> RegistrarAsistenciaAsync(AsistenciaRegistroDTO registroDto);
        Task<ApiResponse<AsistenciaDTO>> RegistrarAsistenciaManualAsync(AsistenciaManualDTO asistenciaDto);
    }
}