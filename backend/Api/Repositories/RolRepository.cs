using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class RolRepository : GenericRepository<Rol>, IRolRepository
    {
        public RolRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public async Task<bool> ExisteNombreAsync(string nombre, int? rolId = null)
        {
            if (rolId.HasValue)
                return await _dbSet.AnyAsync(r => r.Nombre == nombre && r.RolID != rolId);

            return await _dbSet.AnyAsync(r => r.Nombre == nombre);
        }
    }
}