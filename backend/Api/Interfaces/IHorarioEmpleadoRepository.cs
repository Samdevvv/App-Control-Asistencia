using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IHorarioEmpleadoRepository : IGenericRepository<HorarioEmpleado>
    {
        Task<IEnumerable<HorarioEmpleado>> GetByEmpleadoAsync(int empleadoId);
        Task<HorarioEmpleado> GetHorarioVigenteEmpleadoAsync(int empleadoId, DateTime fecha);
    }
}