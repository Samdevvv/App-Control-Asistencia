using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IDepartamentoRepository : IGenericRepository<Departamento>
    {
        Task<bool> ExisteNombreAsync(string nombre, int? departamentoId = null);
    }
}