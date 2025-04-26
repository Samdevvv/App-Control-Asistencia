using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface ICargoRepository : IGenericRepository<Cargo>
    {
        Task<IEnumerable<Cargo>> GetByDepartamentoAsync(int departamentoId);
        Task<bool> ExisteNombreEnDepartamentoAsync(string nombre, int departamentoId, int? cargoId = null);
    }
}