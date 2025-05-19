using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class UsuarioRepository : GenericRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            return await _dbSet
                .Include(u => u.Rol)
                .Include(u => u.Sucursal)
                .Where(u => u.Estado)
                .ToListAsync();
        }

        public override async Task<Usuario> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(u => u.Rol)
                .Include(u => u.Sucursal)
                .FirstOrDefaultAsync(u => u.UsuarioID == id && u.Estado);
        }

        public async Task<Usuario> GetByNombreUsuarioAsync(string nombreUsuario)
        {
            return await _dbSet
                .Include(u => u.Rol)
                .Include(u => u.Sucursal)
                .FirstOrDefaultAsync(u => u.NombreUsuario == nombreUsuario && u.Estado);
        }

        public async Task<Usuario> GetByEmailAsync(string email)
        {
            return await _dbSet
                .Include(u => u.Rol)
                .Include(u => u.Sucursal)
                .FirstOrDefaultAsync(u => u.Email == email && u.Estado);
        }

        public async Task<Usuario> AuthenticateAsync(string nombreUsuario, string contrasena)
        {
            return await _dbSet
                .Include(u => u.Rol)
                .Include(u => u.Sucursal)
                .FirstOrDefaultAsync(u => u.NombreUsuario == nombreUsuario &&
                                         u.Contrasena == contrasena &&
                                         u.Estado);
        }

        public async Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, int? usuarioId = null)
        {
            if (usuarioId.HasValue)
                return await _dbSet.AnyAsync(u => u.NombreUsuario == nombreUsuario && u.UsuarioID != usuarioId);

            return await _dbSet.AnyAsync(u => u.NombreUsuario == nombreUsuario);
        }

        public async Task<bool> ExisteEmailAsync(string email, int? usuarioId = null)
        {
            if (string.IsNullOrEmpty(email))
                return false;

            if (usuarioId.HasValue)
                return await _dbSet.AnyAsync(u => u.Email == email && u.UsuarioID != usuarioId);

            return await _dbSet.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> ActualizarUltimoAccesoAsync(int usuarioId)
        {
            var usuario = await _dbSet.FindAsync(usuarioId);
            if (usuario == null)
                return false;

            usuario.UltimoAcceso = DateTime.Now;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}