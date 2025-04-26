using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ILogSistemaRepository : IGenericRepository<LogSistema>
    {
        Task<IEnumerable<LogSistema>> GetByUsuarioAsync(int usuarioId);
        Task<IEnumerable<LogSistema>> GetByFechaAsync(DateTime fecha);
        Task<IEnumerable<LogSistema>> GetByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
        Task<LogSistema> RegistrarLogAsync(int? usuarioId, string accion, string tabla, int? registro, string detalles);
    }
}