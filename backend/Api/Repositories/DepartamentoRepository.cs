using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class DepartamentoRepository : GenericRepository<Departamento>, IDepartamentoRepository
    {
        public DepartamentoRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public async Task<bool> ExisteNombreAsync(string nombre, int? departamentoId = null)
        {
            if (departamentoId.HasValue)
                return await _dbSet.AnyAsync(d => d.Nombre == nombre && d.DepartamentoID != departamentoId);

            return await _dbSet.AnyAsync(d => d.Nombre == nombre);
        }
    }
}