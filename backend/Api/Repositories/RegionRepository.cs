using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class RegionRepository : GenericRepository<Region>, IRegionRepository
    {
        public RegionRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public async Task<bool> ExisteNombreAsync(string nombre, int? regionId = null)
        {
            if (regionId.HasValue)
                return await _dbSet.AnyAsync(r => r.Nombre == nombre && r.RegionID != regionId);

            return await _dbSet.AnyAsync(r => r.Nombre == nombre);
        }

        public async Task<bool> TieneSucursalesAsync(int regionId)
        {
            return await _context.Sucursales.AnyAsync(s => s.RegionID == regionId && s.Estado);
        }
    }
}