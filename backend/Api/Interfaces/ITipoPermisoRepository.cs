using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ITipoPermisoRepository : IGenericRepository<TipoPermiso>
    {
        Task<bool> ExisteNombreAsync(string nombre, int? tipoPermisoId = null);
    }
}