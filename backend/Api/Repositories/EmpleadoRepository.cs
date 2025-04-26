using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class EmpleadoRepository : GenericRepository<Empleado>, IEmpleadoRepository
    {
        public EmpleadoRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Empleado>> GetAllAsync()
        {
            return await _dbSet
                .Include(e => e.Cargo)
                .ThenInclude(c => c.Departamento)
                .Include(e => e.Sucursal)
                .ThenInclude(s => s.Region)
                .Include(e => e.UsuarioCreador)
                .Where(e => e.Estado)
                .ToListAsync();
        }

        public override async Task<Empleado> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(e => e.Cargo)
                .ThenInclude(c => c.Departamento)
                .Include(e => e.Sucursal)
                .ThenInclude(s => s.Region)
                .Include(e => e.UsuarioCreador)
                .FirstOrDefaultAsync(e => e.EmpleadoID == id && e.Estado);
        }

        public async Task<IEnumerable<Empleado>> GetBySucursalAsync(int sucursalId)
        {
            return await _dbSet
                .Include(e => e.Cargo)
                .ThenInclude(c => c.Departamento)
                .Include(e => e.Sucursal)
                .ThenInclude(s => s.Region)
                .Include(e => e.UsuarioCreador)
                .Where(e => e.SucursalID == sucursalId && e.Estado)
                .ToListAsync();
        }

        public async Task<IEnumerable<Empleado>> GetByRegionAsync(int regionId)
        {
            return await _dbSet
                .Include(e => e.Cargo)
                .ThenInclude(c => c.Departamento)
                .Include(e => e.Sucursal)
                .ThenInclude(s => s.Region)
                .Include(e => e.UsuarioCreador)
                .Where(e => e.Sucursal.RegionID == regionId && e.Estado)
                .ToListAsync();
        }

        public async Task<bool> ExisteCedulaAsync(string cedula, int? empleadoId = null)
        {
            if (empleadoId.HasValue)
                return await _dbSet.AnyAsync(e => e.Cedula == cedula && e.EmpleadoID != empleadoId);

            return await _dbSet.AnyAsync(e => e.Cedula == cedula);
        }

        public async Task<Empleado> GetByHuellaDigitalAsync(byte[] huellaDigital)
        {
            if (huellaDigital == null || huellaDigital.Length == 0)
                return null;

            // Aquí debería implementarse un algoritmo de comparación biométrica
            // Por simplicidad, asumiremos que hay un método para comparar huellas
            // En un escenario real, se usaría una biblioteca especializada

            // Esta implementación es solo un placeholder - en una implementación real
            // se haría una comparación adecuada de huellas digitales
            var empleados = await _dbSet
                .Where(e => e.HuellaDigital != null && e.Estado)
                .ToListAsync();

            // Simulación de comparación de huellas (no usar en producción)
            foreach (var empleado in empleados)
            {
                if (empleado.HuellaDigital.SequenceEqual(huellaDigital))
                    return empleado;
            }

            return null;
        }
    }
}