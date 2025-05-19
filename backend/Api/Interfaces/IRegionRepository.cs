using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IRegionRepository : IGenericRepository<Region>
    {
        Task<bool> ExisteNombreAsync(string nombre, int? regionId = null);
        Task<bool> TieneSucursalesAsync(int regionId);
    }
}