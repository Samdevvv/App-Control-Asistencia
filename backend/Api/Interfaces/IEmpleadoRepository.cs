using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IEmpleadoRepository : IGenericRepository<Empleado>
    {
        Task<IEnumerable<Empleado>> GetBySucursalAsync(int sucursalId);
        Task<IEnumerable<Empleado>> GetByRegionAsync(int regionId);
        Task<bool> ExisteCedulaAsync(string cedula, int? empleadoId = null);
        Task<Empleado> GetByHuellaDigitalAsync(byte[] huellaDigital);
    }
}