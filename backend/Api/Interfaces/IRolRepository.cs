using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IRolRepository : IGenericRepository<Rol>
    {
        Task<bool> ExisteNombreAsync(string nombre, int? rolId = null);
    }
}