using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IUsuarioRepository : IGenericRepository<Usuario>
    {
        Task<Usuario> GetByNombreUsuarioAsync(string nombreUsuario);
        Task<Usuario> GetByEmailAsync(string email);
        Task<Usuario> AuthenticateAsync(string nombreUsuario, string contrasena);
        Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, int? usuarioId = null);
        Task<bool> ExisteEmailAsync(string email, int? usuarioId = null);
        Task<bool> ActualizarUltimoAccesoAsync(int usuarioId);
    }
}