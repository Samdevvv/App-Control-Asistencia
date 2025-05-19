using DefensoriaAsistencia.Core.DTOs;

namespace DefensoriaAsistencia.Core.Interfaces
{
    public interface IUsuarioService
    {
        Task<ApiResponse<IEnumerable<UsuarioDTO>>> GetAllUsuariosAsync();
        Task<ApiResponse<UsuarioDTO>> GetUsuarioByIdAsync(int id);
        Task<ApiResponse<UsuarioDTO>> CreateUsuarioAsync(UsuarioCreateDTO usuarioDto);
        Task<ApiResponse<UsuarioDTO>> UpdateUsuarioAsync(UsuarioUpdateDTO usuarioDto);
        Task<ApiResponse<bool>> DeleteUsuarioAsync(int id);
        Task<ApiResponse<bool>> CambiarContrasenaAsync(CambioContrasenaDTO cambioDto);
    }
}