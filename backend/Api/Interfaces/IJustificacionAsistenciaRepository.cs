using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IJustificacionAsistenciaRepository : IGenericRepository<JustificacionAsistencia>
    {
        Task<IEnumerable<JustificacionAsistencia>> GetByAsistenciaAsync(int asistenciaId);
    }
}