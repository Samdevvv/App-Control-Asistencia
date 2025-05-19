using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class CargoRepository : GenericRepository<Cargo>, ICargoRepository
    {
        public CargoRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Cargo>> GetAllAsync()
        {
            return await _dbSet
                .Include(c => c.Departamento)
                .ToListAsync();
        }

        public override async Task<Cargo> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(c => c.Departamento)
                .FirstOrDefaultAsync(c => c.CargoID == id);
        }

        public async Task<IEnumerable<Cargo>> GetByDepartamentoAsync(int departamentoId)
        {
            return await _dbSet
                .Include(c => c.Departamento)
                .Where(c => c.DepartamentoID == departamentoId && c.Estado)
                .ToListAsync();
        }

        public async Task<bool> ExisteNombreEnDepartamentoAsync(string nombre, int departamentoId, int? cargoId = null)
        {
            if (cargoId.HasValue)
                return await _dbSet.AnyAsync(c => c.Nombre == nombre && c.DepartamentoID == departamentoId && c.CargoID != cargoId);

            return await _dbSet.AnyAsync(c => c.Nombre == nombre && c.DepartamentoID == departamentoId);
        }
    }
}