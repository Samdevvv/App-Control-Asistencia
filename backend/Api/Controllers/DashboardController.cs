using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DefensoriaAsistencia.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IReporteService _reporteService;
        private readonly IEmpleadoService _empleadoService;
        private readonly ISucursalService _sucursalService;
        private readonly IRegionService _regionService;

        public DashboardController(
            IReporteService reporteService,
            IEmpleadoService empleadoService,
            ISucursalService sucursalService,
            IRegionService regionService)
        {
            _reporteService = reporteService;
            _empleadoService = empleadoService;
            _sucursalService = sucursalService;
            _regionService = regionService;
        }

        [HttpGet("resumen")]
        public async Task<ActionResult<ApiResponse<ReporteDashboardDTO>>> GetResumenDashboard([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            // Si no se especifican fechas, usar el mes actual
            if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
            {
                var fechaActual = DateTime.Today;
                filtroDto.FechaInicio = new DateTime(fechaActual.Year, fechaActual.Month, 1);
                filtroDto.FechaFin = filtroDto.FechaInicio.Value.AddMonths(1).AddDays(-1);
            }

            // Si el usuario no es administrador, filtrar por su sucursal
            var rolActual = User.FindFirstValue(ClaimTypes.Role);
            var sucursalIdActual = User.FindFirstValue("SucursalID");

            if (rolActual != "Administrador" && rolActual != "Supervisor" && int.TryParse(sucursalIdActual, out int sucursalId))
            {
                filtroDto.SucursalID = sucursalId;
            }

            var response = await _reporteService.GetReporteDashboardAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("topEmpleadosPuntuales")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReportePuntualidadEmpleadoDTO>>>> GetTopEmpleadosPuntuales([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            // Si no se especifican fechas, usar el mes actual
            if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
            {
                var fechaActual = DateTime.Today;
                filtroDto.FechaInicio = new DateTime(fechaActual.Year, fechaActual.Month, 1);
                filtroDto.FechaFin = filtroDto.FechaInicio.Value.AddMonths(1).AddDays(-1);
            }

            // Si el usuario no es administrador, filtrar por su sucursal
            var rolActual = User.FindFirstValue(ClaimTypes.Role);
            var sucursalIdActual = User.FindFirstValue("SucursalID");

            if (rolActual != "Administrador" && rolActual != "Supervisor" && int.TryParse(sucursalIdActual, out int sucursalId))
            {
                filtroDto.SucursalID = sucursalId;
            }

            var response = await _reporteService.GetTopEmpleadosPuntualesAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("estadisticasPorEmpleado")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReporteEstadisticaEmpleadoDTO>>>> GetEstadisticasPorEmpleado([FromQuery] AsistenciaFiltroDTO filtroDto)
        {
            // Si no se especifican fechas, usar el mes actual
            if (!filtroDto.FechaInicio.HasValue || !filtroDto.FechaFin.HasValue)
            {
                var fechaActual = DateTime.Today;
                filtroDto.FechaInicio = new DateTime(fechaActual.Year, fechaActual.Month, 1);
                filtroDto.FechaFin = filtroDto.FechaInicio.Value.AddMonths(1).AddDays(-1);
            }

            // Si el usuario no es administrador, filtrar por su sucursal
            var rolActual = User.FindFirstValue(ClaimTypes.Role);
            var sucursalIdActual = User.FindFirstValue("SucursalID");

            if (rolActual != "Administrador" && rolActual != "Supervisor" && int.TryParse(sucursalIdActual, out int sucursalId))
            {
                filtroDto.SucursalID = sucursalId;
            }

            var response = await _reporteService.GetReporteEstadisticasAsistenciaPorEmpleadoAsync(filtroDto);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("asistenciasHoy")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AsistenciaDTO>>>> GetAsistenciasHoy()
        {
            // Filtrar por sucursal del usuario si no es administrador
            var rolActual = User.FindFirstValue(ClaimTypes.Role);
            var sucursalIdActual = User.FindFirstValue("SucursalID");

            if (int.TryParse(sucursalIdActual, out int sucursalId) && rolActual != "Administrador")
            {
                // Obtener empleados de la sucursal
                var empleadosResponse = await _empleadoService.GetEmpleadosBySucursalAsync(sucursalId);

                if (!empleadosResponse.Success)
                    return BadRequest(empleadosResponse);

                var empleadosIds = empleadosResponse.Data.Select(e => e.EmpleadoID).ToList();
                var asistenciasHoy = new List<AsistenciaDTO>();

                // Para cada empleado, obtener su asistencia de hoy
                foreach (var empleadoId in empleadosIds)
                {
                    var asistenciasEmpleadoResponse = await _reporteService.GetReporteAsistenciasPorPeriodoAsync(
                        new AsistenciaFiltroDTO
                        {
                            FechaInicio = DateTime.Today,
                            FechaFin = DateTime.Today,
                            EmpleadoID = empleadoId
                        });

                    if (asistenciasEmpleadoResponse.Success && asistenciasEmpleadoResponse.Data.Any())
                    {
                        asistenciasHoy.AddRange(asistenciasEmpleadoResponse.Data
                            .Select(r => new AsistenciaDTO
                            {
                                AsistenciaID = r.AsistenciaID,
                                EmpleadoID = r.EmpleadoID,
                                Fecha = r.Fecha,
                                HoraEntrada = r.HoraEntrada,
                                HoraSalida = r.HoraSalida,
                                EstadoEntrada = r.EstadoEntrada,
                                EstadoSalida = r.EstadoSalida,
                                NombreEmpleado = r.NombreCompleto,
                                CedulaEmpleado = r.Cedula,
                                CargoEmpleado = r.Cargo,
                                SucursalEmpleado = r.Sucursal
                            }));
                    }
                }

                return Ok(ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasHoy));
            }
            else
            {
                // Si es administrador, obtener todas las asistencias de hoy
                var asistenciasResponse = await _reporteService.GetReporteAsistenciasPorPeriodoAsync(
                    new AsistenciaFiltroDTO
                    {
                        FechaInicio = DateTime.Today,
                        FechaFin = DateTime.Today
                    });

                if (!asistenciasResponse.Success)
                    return BadRequest(asistenciasResponse);

                var asistenciasHoy = asistenciasResponse.Data
                    .Select(r => new AsistenciaDTO
                    {
                        AsistenciaID = r.AsistenciaID,
                        EmpleadoID = r.EmpleadoID,
                        Fecha = r.Fecha,
                        HoraEntrada = r.HoraEntrada,
                        HoraSalida = r.HoraSalida,
                        EstadoEntrada = r.EstadoEntrada,
                        EstadoSalida = r.EstadoSalida,
                        NombreEmpleado = r.NombreCompleto,
                        CedulaEmpleado = r.Cedula,
                        CargoEmpleado = r.Cargo,
                        SucursalEmpleado = r.Sucursal
                    });

                return Ok(ApiResponse<IEnumerable<AsistenciaDTO>>.Ok(asistenciasHoy));
            }
        }

        [HttpGet("ausenciasHoy")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ReporteAusenciaDTO>>>> GetAusenciasHoy()
        {
            // Filtrar por sucursal del usuario si no es administrador
            var rolActual = User.FindFirstValue(ClaimTypes.Role);
            var sucursalIdActual = User.FindFirstValue("SucursalID");

            int? sucursalId = null;
            if (int.TryParse(sucursalIdActual, out int sucId) && rolActual != "Administrador")
            {
                sucursalId = sucId;
            }

            var response = await _reporteService.GetReporteAusenciasPorPeriodoAsync(
                new AsistenciaFiltroDTO
                {
                    FechaInicio = DateTime.Today,
                    FechaFin = DateTime.Today,
                    SucursalID = sucursalId
                });

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("resumenSucursales")]
        [Authorize(Roles = "Administrador,Supervisor")]
        public async Task<ActionResult<ApiResponse<IEnumerable<object>>>> GetResumenSucursales()
        {
            var sucursalesResponse = await _sucursalService.GetAllSucursalesAsync();

            if (!sucursalesResponse.Success)
                return BadRequest(sucursalesResponse);

            var sucursales = sucursalesResponse.Data;
            var resultado = new List<object>();

            foreach (var sucursal in sucursales)
            {
                // Obtener empleados de la sucursal
                var empleadosResponse = await _empleadoService.GetEmpleadosBySucursalAsync(sucursal.SucursalID);

                if (!empleadosResponse.Success)
                    continue;

                var totalEmpleados = empleadosResponse.Data.Count();

                // Obtener asistencias de hoy para la sucursal
                var asistenciasResponse = await _reporteService.GetReporteAsistenciasPorPeriodoAsync(
                    new AsistenciaFiltroDTO
                    {
                        FechaInicio = DateTime.Today,
                        FechaFin = DateTime.Today,
                        SucursalID = sucursal.SucursalID
                    });

                int totalAsistencias = 0;
                int atiempo = 0;
                int tarde = 0;

                if (asistenciasResponse.Success)
                {
                    var asistencias = asistenciasResponse.Data;
                    totalAsistencias = asistencias.Count();
                    atiempo = asistencias.Count(a => a.EstadoEntrada == "A tiempo");
                    tarde = asistencias.Count(a => a.EstadoEntrada == "Tarde");
                }

                resultado.Add(new
                {
                    SucursalID = sucursal.SucursalID,
                    Nombre = sucursal.Nombre,
                    Region = sucursal.NombreRegion,
                    TotalEmpleados = totalEmpleados,
                    TotalAsistencias = totalAsistencias,
                    AsistenciasATiempo = atiempo,
                    AsistenciasTarde = tarde,
                    PorcentajeAsistencia = totalEmpleados > 0 ? Math.Round((double)totalAsistencias * 100 / totalEmpleados, 2) : 0,
                    PorcentajeATiempo = totalAsistencias > 0 ? Math.Round((double)atiempo * 100 / totalAsistencias, 2) : 0
                });
            }

            return Ok(ApiResponse<IEnumerable<object>>.Ok(resultado));
        }
    }
}