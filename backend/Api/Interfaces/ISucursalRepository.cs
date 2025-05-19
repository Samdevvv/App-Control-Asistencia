using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ISucursalRepository : IGenericRepository<Sucursal>
    {
        Task<IEnumerable<Sucursal>> GetBySucursalRegionAsync(int regionId);
        Task<bool> ExisteNombreEnRegionAsync(string nombre, int regionId, int? sucursalId = null);
        Task<bool> TieneEmpleadosAsync(int sucursalId);
    }
}