using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class RolService : IRolService
    {
        private readonly IRolRepository _rolRepository;
        private readonly IMapper _mapper;

        public RolService(IRolRepository rolRepository, IMapper mapper)
        {
            _rolRepository = rolRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<RolDTO>>> GetAllRolesAsync()
        {
            try
            {
                var roles = await _rolRepository.GetAsync(r => r.Estado);
                var rolesDto = _mapper.Map<IEnumerable<RolDTO>>(roles);

                return ApiResponse<IEnumerable<RolDTO>>.Ok(rolesDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<RolDTO>>.Fail($"Error al obtener los roles: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RolDTO>> GetRolByIdAsync(int id)
        {
            try
            {
                var rol = await _rolRepository.GetByIdAsync(id);

                if (rol == null || !rol.Estado)
                {
                    return ApiResponse<RolDTO>.Fail("El rol no existe o está inactivo.");
                }

                var rolDto = _mapper.Map<RolDTO>(rol);

                return ApiResponse<RolDTO>.Ok(rolDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<RolDTO>.Fail($"Error al obtener el rol: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RolDTO>> CreateRolAsync(RolCreateDTO rolDto)
        {
            try
            {
                // Verificar que no exista otro rol con el mismo nombre
                if (await _rolRepository.ExisteNombreAsync(rolDto.Nombre))
                {
                    return ApiResponse<RolDTO>.Fail("Ya existe un rol con ese nombre.");
                }

                var rol = _mapper.Map<Rol>(rolDto);
                rol.Estado = true;

                var rolCreado = await _rolRepository.AddAsync(rol);
                var rolCreadoDto = _mapper.Map<RolDTO>(rolCreado);

                return ApiResponse<RolDTO>.Ok(rolCreadoDto, "Rol creado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<RolDTO>.Fail($"Error al crear el rol: {ex.Message}");
            }
        }

        public async Task<ApiResponse<RolDTO>> UpdateRolAsync(RolUpdateDTO rolDto)
        {
            try
            {
                var rolExistente = await _rolRepository.GetByIdAsync(rolDto.RolID);

                if (rolExistente == null || !rolExistente.Estado)
                {
                    return ApiResponse<RolDTO>.Fail("El rol no existe o está inactivo.");
                }

                // Verificar que no exista otro rol con el mismo nombre
                if (await _rolRepository.ExisteNombreAsync(rolDto.Nombre, rolDto.RolID))
                {
                    return ApiResponse<RolDTO>.Fail("Ya existe otro rol con ese nombre.");
                }

                _mapper.Map(rolDto, rolExistente);

                var rolActualizado = await _rolRepository.UpdateAsync(rolExistente);
                var rolActualizadoDto = _mapper.Map<RolDTO>(rolActualizado);

                return ApiResponse<RolDTO>.Ok(rolActualizadoDto, "Rol actualizado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<RolDTO>.Fail($"Error al actualizar el rol: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteRolAsync(int id)
        {
            try
            {
                var rol = await _rolRepository.GetByIdAsync(id);

                if (rol == null || !rol.Estado)
                {
                    return ApiResponse<bool>.Fail("El rol no existe o ya está inactivo.");
                }

                // Verificar que el rol no tenga usuarios asociados
                if (rol.Usuarios != null && rol.Usuarios.Any(u => u.Estado))
                {
                    return ApiResponse<bool>.Fail("No se puede eliminar el rol porque tiene usuarios asociados.");
                }

                // En lugar de eliminar físicamente, se actualiza el estado a inactivo
                rol.Estado = false;
                await _rolRepository.UpdateAsync(rol);

                return ApiResponse<bool>.Ok(true, "Rol eliminado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al eliminar el rol: {ex.Message}");
            }
        }
    }
}