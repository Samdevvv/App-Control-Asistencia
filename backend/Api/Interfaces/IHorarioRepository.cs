using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IHorarioRepository : IGenericRepository<Horario>
    {
        Task<bool> ExisteNombreAsync(string nombre, int? horarioId = null);
        Task<bool> TieneAsignacionesAsync(int horarioId);
    }
}