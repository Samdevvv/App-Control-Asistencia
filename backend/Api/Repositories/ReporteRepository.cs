using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Data.Context;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class ReporteRepository : IReporteRepository
    {
        private readonly DefensoriaDbContext _context;

        public ReporteRepository(DefensoriaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ReporteAsistenciaDTO>> GetReporteAsistenciasPorPeriodoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null,
            int? regionId = null, int? empleadoId = null)
        {
            try
            {
                var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);
                var fechaFinParam = new SqlParameter("@FechaFin", fechaFin);
                var sucursalIdParam = new SqlParameter("@SucursalID", SqlDbType.Int)
                {
                    Value = sucursalId.HasValue ? sucursalId.Value : DBNull.Value as object
                };
                var regionIdParam = new SqlParameter("@RegionID", SqlDbType.Int)
                {
                    Value = regionId.HasValue ? regionId.Value : DBNull.Value as object
                };
                var empleadoIdParam = new SqlParameter("@EmpleadoID", SqlDbType.Int)
                {
                    Value = empleadoId.HasValue ? empleadoId.Value : DBNull.Value as object
                };

                var result = new List<ReporteAsistenciaDTO>();

                using (var command = _context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "EXEC sp_ReporteAsistenciasPorPeriodo @FechaInicio, @FechaFin, @SucursalID, @RegionID, @EmpleadoID";
                    command.Parameters.Add(fechaInicioParam);
                    command.Parameters.Add(fechaFinParam);
                    command.Parameters.Add(sucursalIdParam);
                    command.Parameters.Add(regionIdParam);
                    command.Parameters.Add(empleadoIdParam);

                    await _context.Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new ReporteAsistenciaDTO
                            {
                                AsistenciaID = reader.IsDBNull(reader.GetOrdinal("AsistenciaID")) ? 0 : reader.GetInt32(reader.GetOrdinal("AsistenciaID")),
                                Fecha = reader.GetDateTime(reader.GetOrdinal("Fecha")),
                                HoraEntrada = reader.IsDBNull(reader.GetOrdinal("HoraEntrada")) ? null : reader.GetDateTime(reader.GetOrdinal("HoraEntrada")),
                                HoraSalida = reader.IsDBNull(reader.GetOrdinal("HoraSalida")) ? null : reader.GetDateTime(reader.GetOrdinal("HoraSalida")),
                                EstadoEntrada = reader.IsDBNull(reader.GetOrdinal("EstadoEntrada")) ? null : reader.GetString(reader.GetOrdinal("EstadoEntrada")),
                                EstadoSalida = reader.IsDBNull(reader.GetOrdinal("EstadoSalida")) ? null : reader.GetString(reader.GetOrdinal("EstadoSalida")),
                                EmpleadoID = reader.GetInt32(reader.GetOrdinal("EmpleadoID")),
                                Cedula = reader.GetString(reader.GetOrdinal("Cedula")),
                                NombreCompleto = reader.GetString(reader.GetOrdinal("NombreCompleto")),
                                Cargo = reader.GetString(reader.GetOrdinal("Cargo")),
                                Sucursal = reader.GetString(reader.GetOrdinal("Sucursal")),
                                Region = reader.GetString(reader.GetOrdinal("Region")),
                                EstadoAsistencia = reader.GetString(reader.GetOrdinal("EstadoAsistencia")),
                                HorasTrabajadas = reader.GetDouble(reader.GetOrdinal("HorasTrabajadas"))
                            });
                        }
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return new List<ReporteAsistenciaDTO>();
            }
        }

        public async Task<IEnumerable<ReportePuntualidadEmpleadoDTO>> GetTopEmpleadosPuntualesAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null)
        {
            try
            {
                var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);
                var fechaFinParam = new SqlParameter("@FechaFin", fechaFin);
                var sucursalIdParam = new SqlParameter("@SucursalID", SqlDbType.Int)
                {
                    Value = sucursalId.HasValue ? sucursalId.Value : DBNull.Value as object
                };
                var regionIdParam = new SqlParameter("@RegionID", SqlDbType.Int)
                {
                    Value = regionId.HasValue ? regionId.Value : DBNull.Value as object
                };

                var result = new List<ReportePuntualidadEmpleadoDTO>();

                using (var command = _context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "EXEC sp_TopEmpleadosPuntuales @FechaInicio, @FechaFin, @SucursalID, @RegionID";
                    command.Parameters.Add(fechaInicioParam);
                    command.Parameters.Add(fechaFinParam);
                    command.Parameters.Add(sucursalIdParam);
                    command.Parameters.Add(regionIdParam);

                    await _context.Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new ReportePuntualidadEmpleadoDTO
                            {
                                EmpleadoID = reader.GetInt32(reader.GetOrdinal("EmpleadoID")),
                                Cedula = reader.GetString(reader.GetOrdinal("Cedula")),
                                NombreCompleto = reader.GetString(reader.GetOrdinal("NombreCompleto")),
                                Cargo = reader.GetString(reader.GetOrdinal("Cargo")),
                                Sucursal = reader.GetString(reader.GetOrdinal("Sucursal")),
                                Region = reader.GetString(reader.GetOrdinal("Region")),
                                TotalAsistencias = reader.GetInt32(reader.GetOrdinal("TotalAsistencias")),
                                EntradasATiempo = reader.GetInt32(reader.GetOrdinal("EntradasATiempo")),
                                PorcentajePuntualidad = reader.GetDecimal(reader.GetOrdinal("PorcentajePuntualidad"))
                            });
                        }
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return new List<ReportePuntualidadEmpleadoDTO>();
            }
        }

        public async Task<IEnumerable<ReporteAusenciaDTO>> GetReporteAusenciasPorPeriodoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null)
        {
            try
            {
                var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);
                var fechaFinParam = new SqlParameter("@FechaFin", fechaFin);
                var sucursalIdParam = new SqlParameter("@SucursalID", SqlDbType.Int)
                {
                    Value = sucursalId.HasValue ? sucursalId.Value : DBNull.Value as object
                };
                var regionIdParam = new SqlParameter("@RegionID", SqlDbType.Int)
                {
                    Value = regionId.HasValue ? regionId.Value : DBNull.Value as object
                };

                var result = new List<ReporteAusenciaDTO>();

                using (var command = _context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "EXEC sp_ReporteAusenciasPorPeriodo @FechaInicio, @FechaFin, @SucursalID, @RegionID";
                    command.Parameters.Add(fechaInicioParam);
                    command.Parameters.Add(fechaFinParam);
                    command.Parameters.Add(sucursalIdParam);
                    command.Parameters.Add(regionIdParam);

                    await _context.Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new ReporteAusenciaDTO
                            {
                                EmpleadoID = reader.GetInt32(reader.GetOrdinal("EmpleadoID")),
                                Cedula = reader.GetString(reader.GetOrdinal("Cedula")),
                                NombreCompleto = reader.GetString(reader.GetOrdinal("NombreCompleto")),
                                Cargo = reader.GetString(reader.GetOrdinal("Cargo")),
                                Sucursal = reader.GetString(reader.GetOrdinal("Sucursal")),
                                Region = reader.GetString(reader.GetOrdinal("Region")),
                                FechaAusencia = reader.GetDateTime(reader.GetOrdinal("FechaAusencia")),
                                EstadoAusencia = reader.GetString(reader.GetOrdinal("EstadoAusencia"))
                            });
                        }
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return new List<ReporteAusenciaDTO>();
            }
        }

        public async Task<IEnumerable<ReporteEstadisticaEmpleadoDTO>> GetReporteEstadisticasAsistenciaPorEmpleadoAsync(
            DateTime fechaInicio, DateTime fechaFin, int? empleadoId = null,
            int? sucursalId = null, int? regionId = null)
        {
            try
            {
                var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);
                var fechaFinParam = new SqlParameter("@FechaFin", fechaFin);
                var empleadoIdParam = new SqlParameter("@EmpleadoID", SqlDbType.Int)
                {
                    Value = empleadoId.HasValue ? empleadoId.Value : DBNull.Value as object
                };
                var sucursalIdParam = new SqlParameter("@SucursalID", SqlDbType.Int)
                {
                    Value = sucursalId.HasValue ? sucursalId.Value : DBNull.Value as object
                };
                var regionIdParam = new SqlParameter("@RegionID", SqlDbType.Int)
                {
                    Value = regionId.HasValue ? regionId.Value : DBNull.Value as object
                };

                var result = new List<ReporteEstadisticaEmpleadoDTO>();

                using (var command = _context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "EXEC sp_ReporteEstadisticasAsistenciaPorEmpleado @FechaInicio, @FechaFin, @EmpleadoID, @SucursalID, @RegionID";
                    command.Parameters.Add(fechaInicioParam);
                    command.Parameters.Add(fechaFinParam);
                    command.Parameters.Add(empleadoIdParam);
                    command.Parameters.Add(sucursalIdParam);
                    command.Parameters.Add(regionIdParam);

                    await _context.Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            result.Add(new ReporteEstadisticaEmpleadoDTO
                            {
                                EmpleadoID = reader.GetInt32(reader.GetOrdinal("EmpleadoID")),
                                Cedula = reader.GetString(reader.GetOrdinal("Cedula")),
                                NombreCompleto = reader.GetString(reader.GetOrdinal("NombreCompleto")),
                                Cargo = reader.GetString(reader.GetOrdinal("Cargo")),
                                Sucursal = reader.GetString(reader.GetOrdinal("Sucursal")),
                                Region = reader.GetString(reader.GetOrdinal("Region")),
                                TotalAsistencias = reader.GetInt32(reader.GetOrdinal("TotalAsistencias")),
                                EntradasATiempo = reader.GetInt32(reader.GetOrdinal("EntradasATiempo")),
                                EntradasEnTolerancia = reader.GetInt32(reader.GetOrdinal("EntradasEnTolerancia")),
                                EntradasTarde = reader.GetInt32(reader.GetOrdinal("EntradasTarde")),
                                SalidasCompletas = reader.GetInt32(reader.GetOrdinal("SalidasCompletas")),
                                SalidasEnTolerancia = reader.GetInt32(reader.GetOrdinal("SalidasEnTolerancia")),
                                SalidasTempranas = reader.GetInt32(reader.GetOrdinal("SalidasTempranas")),
                                TotalAusencias = reader.GetInt32(reader.GetOrdinal("TotalAusencias")),
                                TotalPermisos = reader.GetInt32(reader.GetOrdinal("TotalPermisos")),
                                PromedioHorasTrabajadas = reader.IsDBNull(reader.GetOrdinal("PromedioHorasTrabajadas")) ? 0 : reader.GetDouble(reader.GetOrdinal("PromedioHorasTrabajadas"))
                            });
                        }
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return new List<ReporteEstadisticaEmpleadoDTO>();
            }
        }

        public async Task<ReporteDashboardDTO> GetReporteDashboardAsync(
            DateTime fechaInicio, DateTime fechaFin, int? sucursalId = null, int? regionId = null)
        {
            try
            {
                var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);
                var fechaFinParam = new SqlParameter("@FechaFin", fechaFin);
                var sucursalIdParam = new SqlParameter("@SucursalID", SqlDbType.Int)
                {
                    Value = sucursalId.HasValue ? sucursalId.Value : DBNull.Value as object
                };
                var regionIdParam = new SqlParameter("@RegionID", SqlDbType.Int)
                {
                    Value = regionId.HasValue ? regionId.Value : DBNull.Value as object
                };

                var dashboard = new ReporteDashboardDTO();

                using (var command = _context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "EXEC sp_ReporteDashboard @FechaInicio, @FechaFin, @SucursalID, @RegionID";
                    command.Parameters.Add(fechaInicioParam);
                    command.Parameters.Add(fechaFinParam);
                    command.Parameters.Add(sucursalIdParam);
                    command.Parameters.Add(regionIdParam);

                    await _context.Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        // Primer resultado: Total de empleados
                        if (await reader.ReadAsync())
                        {
                            dashboard.TotalEmpleados = reader.GetInt32(0);
                        }

                        // Avanzar al siguiente conjunto de resultados: Total de asistencias
                        await reader.NextResultAsync();
                        if (await reader.ReadAsync())
                        {
                            dashboard.TotalAsistencias = reader.GetInt32(0);
                        }

                        // Estadísticas de entrada
                        await reader.NextResultAsync();
                        if (await reader.ReadAsync())
                        {
                            dashboard.EntradasEstadistica = new EntradasEstadisticaDTO
                            {
                                EntradasATiempo = reader.IsDBNull(0) ? 0 : reader.GetInt32(0),
                                EntradasEnTolerancia = reader.IsDBNull(1) ? 0 : reader.GetInt32(1),
                                EntradasTarde = reader.IsDBNull(2) ? 0 : reader.GetInt32(2)
                            };
                        }

                        // Estadísticas de salida
                        await reader.NextResultAsync();
                        if (await reader.ReadAsync())
                        {
                            dashboard.SalidasEstadistica = new SalidasEstadisticaDTO
                            {
                                SalidasCompletas = reader.IsDBNull(0) ? 0 : reader.GetInt32(0),
                                SalidasEnTolerancia = reader.IsDBNull(1) ? 0 : reader.GetInt32(1),
                                SalidasTempranas = reader.IsDBNull(2) ? 0 : reader.GetInt32(2),
                                SinSalidaRegistrada = reader.IsDBNull(3) ? 0 : reader.GetInt32(3)
                            };
                        }

                        // Asistencias por día de la semana
                        await reader.NextResultAsync();
                        var asistenciasPorDiaSemana = new List<AsistenciaDiaSemanaDTO>();
                        while (await reader.ReadAsync())
                        {
                            asistenciasPorDiaSemana.Add(new AsistenciaDiaSemanaDTO
                            {
                                DiaSemana = reader.GetInt32(0),
                                TotalAsistencias = reader.GetInt32(1)
                            });
                        }
                        dashboard.AsistenciasPorDiaSemana = asistenciasPorDiaSemana;

                        // Asistencias por región
                        await reader.NextResultAsync();
                        var asistenciasPorRegion = new List<AsistenciaRegionDTO>();
                        while (await reader.ReadAsync())
                        {
                            asistenciasPorRegion.Add(new AsistenciaRegionDTO
                            {
                                RegionID = reader.GetInt32(0),
                                Region = reader.GetString(1),
                                TotalAsistencias = reader.GetInt32(2)
                            });
                        }
                        dashboard.AsistenciasPorRegion = asistenciasPorRegion;

                        // Asistencias por sucursal
                        await reader.NextResultAsync();
                        var asistenciasPorSucursal = new List<AsistenciaSucursalDTO>();
                        while (await reader.ReadAsync())
                        {
                            asistenciasPorSucursal.Add(new AsistenciaSucursalDTO
                            {
                                SucursalID = reader.GetInt32(0),
                                Sucursal = reader.GetString(1),
                                Region = reader.GetString(2),
                                TotalAsistencias = reader.GetInt32(3)
                            });
                        }
                        dashboard.AsistenciasPorSucursal = asistenciasPorSucursal;

                        // Top 10 empleados con más asistencias puntuales
                        await reader.NextResultAsync();
                        var topEmpleadosPuntuales = new List<ReportePuntualidadEmpleadoDTO>();
                        while (await reader.ReadAsync())
                        {
                            topEmpleadosPuntuales.Add(new ReportePuntualidadEmpleadoDTO
                            {
                                EmpleadoID = reader.GetInt32(0),
                                Cedula = reader.GetString(1),
                                NombreCompleto = reader.GetString(2),
                                Cargo = reader.GetString(3),
                                Sucursal = reader.GetString(4),
                                Region = reader.GetString(5),
                                TotalAsistencias = reader.GetInt32(6),
                                EntradasATiempo = reader.GetInt32(7),
                                PorcentajePuntualidad = reader.GetDecimal(8)
                            });
                        }
                        dashboard.TopEmpleadosPuntuales = topEmpleadosPuntuales;

                        // Top departamentos con mejor asistencia
                        await reader.NextResultAsync();
                        var topDepartamentosPuntuales = new List<AsistenciaDepartamentoDTO>();
                        while (await reader.ReadAsync())
                        {
                            topDepartamentosPuntuales.Add(new AsistenciaDepartamentoDTO
                            {
                                DepartamentoID = reader.GetInt32(0),
                                Departamento = reader.GetString(1),
                                TotalEmpleados = reader.GetInt32(2),
                                TotalAsistencias = reader.GetInt32(3),
                                EntradasATiempo = reader.GetInt32(4),
                                PorcentajePuntualidad = reader.GetDecimal(5)
                            });
                        }
                        dashboard.TopDepartamentosPuntuales = topDepartamentosPuntuales;

                        // Estadísticas por día
                        await reader.NextResultAsync();
                        var asistenciasPorDia = new List<AsistenciaDiaDTO>();
                        while (await reader.ReadAsync())
                        {
                            asistenciasPorDia.Add(new AsistenciaDiaDTO
                            {
                                Fecha = reader.GetDateTime(0),
                                TotalAsistencias = reader.GetInt32(1),
                                EntradasATiempo = reader.GetInt32(2),
                                EntradasEnTolerancia = reader.GetInt32(3),
                                EntradasTarde = reader.GetInt32(4),
                                PorcentajePuntualidad = reader.GetDecimal(5)
                            });
                        }
                        dashboard.AsistenciasPorDia = asistenciasPorDia;

                        // Estadísticas de asistencia vs ausencias
                        await reader.NextResultAsync();
                        if (await reader.ReadAsync())
                        {
                            dashboard.EstadisticaGeneral = new AsistenciaEstadisticaGeneralDTO
                            {
                                TotalEmpleados = reader.GetInt32(0),
                                EmpleadosConAsistencia = reader.GetInt32(1),
                                EmpleadosSinAsistencia = reader.GetInt32(2),
                                TotalAsistenciasRegistradas = reader.GetInt32(3),
                                DiasLaborables = reader.GetInt32(4),
                                AsistenciasEsperadas = reader.GetInt32(5),
                                PorcentajeAsistencia = reader.IsDBNull(6) ? 0 : reader.GetDecimal(6)
                            };
                        }
                    }
                }

                return dashboard;
            }
            catch (Exception)
            {
                return new ReporteDashboardDTO();
            }
        }
    }
}