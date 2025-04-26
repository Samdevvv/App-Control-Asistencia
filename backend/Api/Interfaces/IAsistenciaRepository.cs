using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IAsistenciaRepository : IGenericRepository<Asistencia>
    {
        Task<IEnumerable<Asistencia>> GetByEmpleadoAsync(int empleadoId);
        Task<IEnumerable<Asistencia>> GetByFechaAsync(DateTime fecha);
        Task<IEnumerable<Asistencia>> GetByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
        Task<IEnumerable<Asistencia>> GetByEmpleadoFechaAsync(int empleadoId, DateTime fecha);
        Task<Asistencia> RegistrarAsistenciaAsync(int empleadoId, byte[] huellaDigital);
        Task<Asistencia> RegistrarAsistenciaManualAsync(AsistenciaManualDTO asistencia);
    }
}