using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class EmpleadoService : IEmpleadoService
    {
        private readonly IEmpleadoRepository _empleadoRepository;
        private readonly ICargoRepository _cargoRepository;
        private readonly ISucursalRepository _sucursalRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IMapper _mapper;

        public EmpleadoService(
            IEmpleadoRepository empleadoRepository,
            ICargoRepository cargoRepository,
            ISucursalRepository sucursalRepository,
            IUsuarioRepository usuarioRepository,
            IMapper mapper)
        {
            _empleadoRepository = empleadoRepository;
            _cargoRepository = cargoRepository;
            _sucursalRepository = sucursalRepository;
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetAllEmpleadosAsync()
        {
            try
            {
                var empleados = await _empleadoRepository.GetAllAsync();
                var empleadosDto = _mapper.Map<IEnumerable<EmpleadoDTO>>(empleados);

                return ApiResponse<IEnumerable<EmpleadoDTO>>.Ok(empleadosDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<EmpleadoDTO>>.Fail($"Error al obtener los empleados: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetEmpleadosBySucursalAsync(int sucursalId)
        {
            try
            {
                var sucursal = await _sucursalRepository.GetByIdAsync(sucursalId);

                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<IEnumerable<EmpleadoDTO>>.Fail("La sucursal no existe o está inactiva.");
                }

                var empleados = await _empleadoRepository.GetBySucursalAsync(sucursalId);
                var empleadosDto = _mapper.Map<IEnumerable<EmpleadoDTO>>(empleados);

                return ApiResponse<IEnumerable<EmpleadoDTO>>.Ok(empleadosDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<EmpleadoDTO>>.Fail($"Error al obtener los empleados por sucursal: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<EmpleadoDTO>>> GetEmpleadosByRegionAsync(int regionId)
        {
            try
            {
                var empleados = await _empleadoRepository.GetByRegionAsync(regionId);
                var empleadosDto = _mapper.Map<IEnumerable<EmpleadoDTO>>(empleados);

                return ApiResponse<IEnumerable<EmpleadoDTO>>.Ok(empleadosDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<EmpleadoDTO>>.Fail($"Error al obtener los empleados por región: {ex.Message}");
            }
        }

        public async Task<ApiResponse<EmpleadoDTO>> GetEmpleadoByIdAsync(int id)
        {
            try
            {
                var empleado = await _empleadoRepository.GetByIdAsync(id);

                if (empleado == null || !empleado.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El empleado no existe o está inactivo.");
                }

                var empleadoDto = _mapper.Map<EmpleadoDTO>(empleado);

                return ApiResponse<EmpleadoDTO>.Ok(empleadoDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<EmpleadoDTO>.Fail($"Error al obtener el empleado: {ex.Message}");
            }
        }

        public async Task<ApiResponse<EmpleadoDTO>> CreateEmpleadoAsync(EmpleadoCreateDTO empleadoDto)
        {
            try
            {
                // Verificar que no exista otro empleado con la misma cédula
                if (await _empleadoRepository.ExisteCedulaAsync(empleadoDto.Cedula))
                {
                    return ApiResponse<EmpleadoDTO>.Fail("Ya existe un empleado con esa cédula.");
                }

                // Verificar que exista el cargo
                var cargo = await _cargoRepository.GetByIdAsync(empleadoDto.CargoID);
                if (cargo == null || !cargo.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El cargo no existe o está inactivo.");
                }

                // Verificar que exista la sucursal
                var sucursal = await _sucursalRepository.GetByIdAsync(empleadoDto.SucursalID);
                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                // Verificar que exista el usuario creador
                var usuario = await _usuarioRepository.GetByIdAsync(empleadoDto.UsuarioCreacion);
                if (usuario == null || !usuario.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El usuario creador no existe o está inactivo.");
                }

                var empleado = _mapper.Map<Empleado>(empleadoDto);
                empleado.Estado = true;

                var empleadoCreado = await _empleadoRepository.AddAsync(empleado);
                var empleadoCreadoDto = _mapper.Map<EmpleadoDTO>(empleadoCreado);

                // Asignar los valores de navegación para la respuesta
                empleadoCreadoDto.NombreCargo = cargo.Nombre;
                empleadoCreadoDto.NombreSucursal = sucursal.Nombre;
                empleadoCreadoDto.NombreRegion = sucursal.Region?.Nombre;
                empleadoCreadoDto.NombreUsuarioCreador = $"{usuario.Nombre} {usuario.Apellido}";

                return ApiResponse<EmpleadoDTO>.Ok(empleadoCreadoDto, "Empleado creado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<EmpleadoDTO>.Fail($"Error al crear el empleado: {ex.Message}");
            }
        }

        public async Task<ApiResponse<EmpleadoDTO>> UpdateEmpleadoAsync(EmpleadoUpdateDTO empleadoDto)
        {
            try
            {
                var empleadoExistente = await _empleadoRepository.GetByIdAsync(empleadoDto.EmpleadoID);

                if (empleadoExistente == null || !empleadoExistente.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El empleado no existe o está inactivo.");
                }

                // Verificar que no exista otro empleado con la misma cédula
                if (await _empleadoRepository.ExisteCedulaAsync(empleadoDto.Cedula, empleadoDto.EmpleadoID))
                {
                    return ApiResponse<EmpleadoDTO>.Fail("Ya existe otro empleado con esa cédula.");
                }

                // Verificar que exista el cargo
                var cargo = await _cargoRepository.GetByIdAsync(empleadoDto.CargoID);
                if (cargo == null || !cargo.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El cargo no existe o está inactivo.");
                }

                // Verificar que exista la sucursal
                var sucursal = await _sucursalRepository.GetByIdAsync(empleadoDto.SucursalID);
                if (sucursal == null || !sucursal.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("La sucursal no existe o está inactiva.");
                }

                // Verificar que exista el usuario creador
                var usuario = await _usuarioRepository.GetByIdAsync(empleadoDto.UsuarioCreacion);
                if (usuario == null || !usuario.Estado)
                {
                    return ApiResponse<EmpleadoDTO>.Fail("El usuario creador no existe o está inactivo.");
                }

                // Conservar la huella digital si no se proporciona una nueva
                if (empleadoDto.HuellaDigital == null || empleadoDto.HuellaDigital.Length == 0)
                {
                    empleadoDto.HuellaDigital = empleadoExistente.HuellaDigital;
                }

                _mapper.Map(empleadoDto, empleadoExistente);

                var empleadoActualizado = await _empleadoRepository.UpdateAsync(empleadoExistente);
                var empleadoActualizadoDto = _mapper.Map<EmpleadoDTO>(empleadoActualizado);

                // Asignar los valores de navegación para la respuesta
                empleadoActualizadoDto.NombreCargo = cargo.Nombre;
                empleadoActualizadoDto.NombreSucursal = sucursal.Nombre;
                empleadoActualizadoDto.NombreRegion = sucursal.Region?.Nombre;
                empleadoActualizadoDto.NombreUsuarioCreador = $"{usuario.Nombre} {usuario.Apellido}";

                return ApiResponse<EmpleadoDTO>.Ok(empleadoActualizadoDto, "Empleado actualizado exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<EmpleadoDTO>.Fail($"Error al actualizar el empleado: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> CambiarEstadoEmpleadoAsync(EmpleadoEstadoDTO estadoDto)
        {
            try
            {
                var empleado = await _empleadoRepository.GetByIdAsync(estadoDto.EmpleadoID);

                if (empleado == null)
                {
                    return ApiResponse<bool>.Fail("El empleado no existe.");
                }

                // Cambiar el estado del empleado
                empleado.Estado = estadoDto.Estado;
                await _empleadoRepository.UpdateAsync(empleado);

                string mensaje = estadoDto.Estado ?
                    "Empleado activado exitosamente." :
                    "Empleado desactivado exitosamente.";

                return ApiResponse<bool>.Ok(true, mensaje);
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.Fail($"Error al cambiar el estado del empleado: {ex.Message}");
            }
        }
    }
}