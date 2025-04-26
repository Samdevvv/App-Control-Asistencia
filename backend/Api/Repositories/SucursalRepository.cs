using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class SucursalRepository : GenericRepository<Sucursal>, ISucursalRepository
    {
        public SucursalRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Sucursal>> GetAllAsync()
        {
            return await _dbSet
                .Include(s => s.Region)
                .ToListAsync();
        }

        public override async Task<Sucursal> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(s => s.Region)
                .FirstOrDefaultAsync(s => s.SucursalID == id);
        }

        public async Task<IEnumerable<Sucursal>> GetBySucursalRegionAsync(int regionId)
        {
            return await _dbSet
                .Include(s => s.Region)
                .Where(s => s.RegionID == regionId && s.Estado)
                .ToListAsync();
        }

        public async Task<bool> ExisteNombreEnRegionAsync(string nombre, int regionId, int? sucursalId = null)
        {
            if (sucursalId.HasValue)
                return await _dbSet.AnyAsync(s => s.Nombre == nombre && s.RegionID == regionId && s.SucursalID != sucursalId);

            return await _dbSet.AnyAsync(s => s.Nombre == nombre && s.RegionID == regionId);
        }

        public async Task<bool> TieneEmpleadosAsync(int sucursalId)
        {
            return await _context.Empleados.AnyAsync(e => e.SucursalID == sucursalId && e.Estado);
        }
    }
}