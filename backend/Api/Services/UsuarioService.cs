using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IRolRepository _rolRepository;
        private readonly ISucursalRepository _sucursalRepository;
        private readonly IMapper _mapper;

        public UsuarioService(
            IUsuarioRepository usuarioRepository,
            IRolRepository rolRepository,
            ISucursalRepository sucursalRepository,
            IMapper mapper)
        {
            _usuarioRepository = usuarioRepository;
            _rolRepository = rolRepository;
            _sucursalRepository = sucursalRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<UsuarioDTO>>> GetAllUsuariosAsync()
        {
            try
            {
                var usuarios = await _usuarioRepository.GetAllAsync();
                var usuariosDto = _mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);

                return ApiResponse<IEnumerable<UsuarioDTO>>.Ok(usuariosDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<UsuarioDTO>>.Fail($"Error al obtener los usuarios: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UsuarioDTO>> GetUsuarioByIdAsync(int id)
        {
            try
            {
                var usuario = await _usuarioRepository.GetByIdAsync(id);

                if (usuario == null || !usuario.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("El usuario no existe o está inactivo.");
                }

                var usuarioDto = _mapper.Map<UsuarioDTO>(usuario);

                return ApiResponse<UsuarioDTO>.Ok(usuarioDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<UsuarioDTO>.Fail($"Error al obtener el usuario: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UsuarioDTO>> CreateUsuarioAsync(UsuarioCreateDTO usuarioDto)
        {
            try
            {
                // Verificar que no exista otro usuario con el mismo nombre de usuario
                if (await _usuarioRepository.ExisteNombreUsuarioAsync(usuarioDto.NombreUsuario))
                {
                    return ApiResponse<UsuarioDTO>.Fail("Ya existe un usuario con ese nombre de usuario.");
                }

                // Verificar que no exista otro usuario con el mismo email
                if (!string.IsNullOrEmpty(usuarioDto.Email) && await _usuarioRepository.ExisteEmailAsync(usuarioDto.Email))
                {
                    return ApiResponse<UsuarioDTO>.Fail("Ya existe un usuario con ese correo electrónico.");
                }

                // Verificar que exista el rol
                var rol = await _rolRepository.GetByIdAsync(usuarioDto.RolID);
                if (rol == null || !rol.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("El rol no existe o está inactivo.");
                }

                // Verificar que exista la sucursal
                var sucursal = await _sucursalRepository.GetByIdAsync(usuarioDto.SucursalID);
                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                var usuario = _mapper.Map<Usuario>(usuarioDto);
                usuario.Estado = true;

                var usuarioCreado = await _usuarioRepository.AddAsync(usuario);
                var usuarioCreadoDto = _mapper.Map<UsuarioDTO>(usuarioCreado);

                // Asignar los valores de navegación para la respuesta
                usuarioCreadoDto.NombreRol = rol.Nombre;
                usuarioCreadoDto.NombreSucursal = sucursal.Nombre;

                return ApiResponse<UsuarioDTO>.Ok(usuarioCreadoDto, "Usuario creado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<UsuarioDTO>.Fail($"Error al crear el usuario: {ex.Message}");
            }
        }

        public async Task<ApiResponse<UsuarioDTO>> UpdateUsuarioAsync(UsuarioUpdateDTO usuarioDto)
        {
            try
            {
                var usuarioExistente = await _usuarioRepository.GetByIdAsync(usuarioDto.UsuarioID);

                if (usuarioExistente == null || !usuarioExistente.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("El usuario no existe o está inactivo.");
                }

                // Verificar que no exista otro usuario con el mismo nombre de usuario
                if (await _usuarioRepository.ExisteNombreUsuarioAsync(usuarioDto.NombreUsuario, usuarioDto.UsuarioID))
                {
                    return ApiResponse<UsuarioDTO>.Fail("Ya existe otro usuario con ese nombre de usuario.");
                }

                // Verificar que no exista otro usuario con el mismo email
                if (!string.IsNullOrEmpty(usuarioDto.Email) &&
                    await _usuarioRepository.ExisteEmailAsync(usuarioDto.Email, usuarioDto.UsuarioID))
                {
                    return ApiResponse<UsuarioDTO>.Fail("Ya existe otro usuario con ese correo electrónico.");
                }

                // Verificar que exista el rol
                var rol = await _rolRepository.GetByIdAsync(usuarioDto.RolID);
                if (rol == null || !rol.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("El rol no existe o está inactivo.");
                }

                // Verificar que exista la sucursal
                var sucursal = await _sucursalRepository.GetByIdAsync(usuarioDto.SucursalID);
                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<UsuarioDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                // Si no se proporciona contraseña, mantener la existente
                if (string.IsNullOrEmpty(usuarioDto.Contrasena))
                {
                    usuarioDto.Contrasena = usuarioExistente.Contrasena;
                }

                _mapper.Map(usuarioDto, usuarioExistente);

                var usuarioActualizado = await _usuarioRepository.UpdateAsync(usuarioExistente);
                var usuarioActualizadoDto = _mapper.Map<UsuarioDTO>(usuarioActualizado);

                // Asignar los valores de navegación para la respuesta
                usuarioActualizadoDto.NombreRol = rol.Nombre;
                usuarioActualizadoDto.NombreSucursal = sucursal.Nombre;

                return ApiResponse<UsuarioDTO>.Ok(usuarioActualizadoDto, "Usuario actualizado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<UsuarioDTO>.Fail($"Error al actualizar el usuario: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteUsuarioAsync(int id)
        {
            try
            {
                var usuario = await _usuarioRepository.GetByIdAsync(id);

                if (usuario == null || !usuario.Estado)
                {
                    return ApiResponse<bool>.Fail("El usuario no existe o ya está inactivo.");
                }

                // En lugar de eliminar físicamente, se actualiza el estado a inactivo
                usuario.Estado = false;
                await _usuarioRepository.UpdateAsync(usuario);

                return ApiResponse<bool>.Ok(true, "Usuario eliminado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al eliminar el usuario: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> CambiarContrasenaAsync(CambioContrasenaDTO cambioDto)
        {
            try
            {
                var usuario = await _usuarioRepository.GetByIdAsync(cambioDto.UsuarioID);

                if (usuario == null || !usuario.Estado)
                {
                    return ApiResponse<bool>.Fail("El usuario no existe o está inactivo.");
                }

                // Verificar que la contraseña actual sea correcta
                if (usuario.Contrasena != cambioDto.ContrasenaActual)
                {
                    return ApiResponse<bool>.Fail("La contraseña actual es incorrecta.");
                }

                // Actualizar la contraseña
                usuario.Contrasena = cambioDto.ContrasenaNueva;
                await _usuarioRepository.UpdateAsync(usuario);

                return ApiResponse<bool>.Ok(true, "Contraseña cambiada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al cambiar la contraseña: {ex.Message}");
            }
        }
    }
}