using AutoMapper;
using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;

namespace DefensoriaAsistencia.Core.Services
{
    public class AsistenciaService : IAsistenciaService
    {
        private readonly IAsistenciaRepository _asistenciaRepository;
        private readonly IEmpleadoRepository _empleadoRepository;
        private readonly IMapper _mapper;

        public AsistenciaService(
            IAsistenciaRepository asistenciaRepository,
            IEmpleadoRepository empleadoRepository,
            IMapper mapper)
        {
            _asistenciaRepository = asistenciaRepository;
            _empleadoRepository = empleadoRepository;
            _mapper = mapper;
        }

        public async Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAllAsistenciasAsync()
        {
            try
            {
                var asistencias = await _asistenciaRepository.GetAllAsync();
                var asistenciasDto = _mapper.Map<IEnumerable<AsistenciaDTO>>(asistencias);

                return ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<AsistenciaDTO>>.Fail($"Error al obtener las asistencias: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByEmpleadoAsync(int empleadoId)
        {
            try
            {
                var empleado = await _empleadoRepository.GetByIdAsync(empleadoId);

                if (empleado == null || !empleado.Estado)
                {
                    return ApiResponse<IEnumerable<AsistenciaDTO>>.Fail("El empleado no existe o está inactivo.");
                }

                var asistencias = await _asistenciaRepository.GetByEmpleadoAsync(empleadoId);
                var asistenciasDto = _mapper.Map<IEnumerable<AsistenciaDTO>>(asistencias);

                return ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<AsistenciaDTO>>.Fail($"Error al obtener las asistencias por empleado: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByFechaAsync(DateTime fecha)
        {
            try
            {
                var asistencias = await _asistenciaRepository.GetByFechaAsync(fecha);
                var asistenciasDto = _mapper.Map<IEnumerable<AsistenciaDTO>>(asistencias);

                return ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<AsistenciaDTO>>.Fail($"Error al obtener las asistencias por fecha: {ex.Message}");
            }
        }

        public async Task<ApiResponse<IEnumerable<AsistenciaDTO>>> GetAsistenciasByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                var asistencias = await _asistenciaRepository.GetByRangoFechasAsync(fechaInicio, fechaFin);
                var asistenciasDto = _mapper.Map<IEnumerable<AsistenciaDTO>>(asistencias);

                return ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<AsistenciaDTO>>.Fail($"Error al obtener las asistencias por rango de fechas: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AsistenciaDTO>> GetAsistenciaByIdAsync(int id)
        {
            try
            {
                var asistencia = await _asistenciaRepository.GetByIdAsync(id);

                if (asistencia == null)
                {
                    return ApiResponse<AsistenciaDTO>.Fail("La asistencia no existe.");
                }

                var asistenciaDto = _mapper.Map<AsistenciaDTO>(asistencia);

                return ApiResponse<AsistenciaDTO>.Ok(asistenciaDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<AsistenciaDTO>.Fail($"Error al obtener la asistencia: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AsistenciaDTO>> RegistrarAsistenciaAsync(AsistenciaRegistroDTO registroDto)
        {
            try
            {
                // Verificar que exista el empleado
                var empleado = await _empleadoRepository.GetByIdAsync(registroDto.EmpleadoID);

                if (empleado == null || !empleado.Estado)
                {
                    return ApiResponse<AsistenciaDTO>.Fail("El empleado no existe o está inactivo.");
                }

                // Si no se proporciona huella digital, usar la huella almacenada del empleado
                byte[] huellaDigital = registroDto.HuellaDigital ?? empleado.HuellaDigital;

                // Registrar la asistencia usando el stored procedure
                var asistencia = await _asistenciaRepository.RegistrarAsistenciaAsync(registroDto.EmpleadoID, huellaDigital);

                if (asistencia == null)
                {
                    return ApiResponse<AsistenciaDTO>.Fail("Error al registrar la asistencia.");
                }

                var asistenciaDto = _mapper.Map<AsistenciaDTO>(asistencia);

                // Determinar el tipo de registro (entrada o salida)
                string mensaje = asistencia.HoraSalida.HasValue ?
                    "Salida registrada exitosamente." :
                    "Entrada registrada exitosamente.";

                return ApiResponse<AsistenciaDTO>.Ok(asistenciaDto, mensaje);
            }
            catch (Exception ex)
            {
                return ApiResponse<AsistenciaDTO>.Fail($"Error al registrar la asistencia: {ex.Message}");
            }
        }

        public async Task<ApiResponse<AsistenciaDTO>> RegistrarAsistenciaManualAsync(AsistenciaManualDTO asistenciaDto)
        {
            try
            {
                // Verificar que exista el empleado
                var empleado = await _empleadoRepository.GetByIdAsync(asistenciaDto.EmpleadoID);

                if (empleado == null || !empleado.Estado)
                {
                    return ApiResponse<AsistenciaDTO>.Fail("El empleado no existe o está inactivo.");
                }

                // Registrar la asistencia manual
                var asistencia = await _asistenciaRepository.RegistrarAsistenciaManualAsync(asistenciaDto);

                if (asistencia == null)
                {
                    return ApiResponse<AsistenciaDTO>.Fail("Error al registrar la asistencia manual.");
                }

                var asistenciaResultDto = _mapper.Map<AsistenciaDTO>(asistencia);

                return ApiResponse<AsistenciaDTO>.Ok(asistenciaResultDto, "Asistencia manual registrada exitosamente.");
            }
            catch (Exception ex)
            {
                return ApiResponse<AsistenciaDTO>.Fail($"Error al registrar la asistencia manual: {ex.Message}");
            }
        }
    }
}