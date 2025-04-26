using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IDiaNoLaborableRepository : IGenericRepository<DiaNoLaborable>
    {
        Task<IEnumerable<DiaNoLaborable>> GetBySucursalAsync(int sucursalId);
        Task<bool> ExisteDiaNoLaborableGlobalAsync(DateTime fecha, int? diaNoLaborableId = null);
        Task<bool> ExisteDiaNoLaborableSucursalAsync(DateTime fecha, int sucursalId, int? diaNoLaborableId = null);
    }
}