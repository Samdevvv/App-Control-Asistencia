using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IPermisoRepository : IGenericRepository<Permiso>
    {
        Task<IEnumerable<Permiso>> GetByEmpleadoAsync(int empleadoId);
        Task<IEnumerable<Permiso>> GetByFechaAsync(DateTime fecha);
        Task<IEnumerable<Permiso>> GetByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin);
    }
}
