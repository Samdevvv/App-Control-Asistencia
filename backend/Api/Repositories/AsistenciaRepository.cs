using DefensoriaAsistencia.Core.DTOs;
using DefensoriaAsistencia.Core.Interfaces;
using DefensoriaAsistencia.Core.Models;
using DefensoriaAsistencia.Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.Data.SqlClient;

namespace DefensoriaAsistencia.Data.Repositories
{
    public class AsistenciaRepository : GenericRepository<Asistencia>, IAsistenciaRepository
    {
        public AsistenciaRepository(DefensoriaDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Asistencia>> GetAllAsync()
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .ToListAsync();
        }

        public override async Task<Asistencia> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .FirstOrDefaultAsync(a => a.AsistenciaID == id);
        }

        public async Task<IEnumerable<Asistencia>> GetByEmpleadoAsync(int empleadoId)
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .Where(a => a.EmpleadoID == empleadoId)
                .OrderByDescending(a => a.Fecha)
                .ToListAsync();
        }

        public async Task<IEnumerable<Asistencia>> GetByFechaAsync(DateTime fecha)
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .Where(a => a.Fecha.Date == fecha.Date)
                .ToListAsync();
        }

        public async Task<IEnumerable<Asistencia>> GetByRangoFechasAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .Where(a => a.Fecha.Date >= fechaInicio.Date && a.Fecha.Date <= fechaFin.Date)
                .ToListAsync();
        }

        public async Task<IEnumerable<Asistencia>> GetByEmpleadoFechaAsync(int empleadoId, DateTime fecha)
        {
            return await _dbSet
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Cargo)
                .Include(a => a.Empleado)
                .ThenInclude(e => e.Sucursal)
                .Where(a => a.EmpleadoID == empleadoId && a.Fecha.Date == fecha.Date)
                .ToListAsync();
        }

        public async Task<Asistencia> RegistrarAsistenciaAsync(int empleadoId, byte[] huellaDigital)
        {
            // Esta función debería llamar al stored procedure sp_RegistrarAsistencia
            // Pero primero verificamos que exista el empleado
            var empleado = await _context.Empleados.FindAsync(empleadoId);
            if (empleado == null)
                return null;

            try
            {
                // Parámetros para el SP
                var empleadoParam = new SqlParameter("@EmpleadoID", empleadoId);
                var huellaParam = new SqlParameter("@HuellaDigital", SqlDbType.VarBinary, -1)
                {
                    Value = huellaDigital ?? DBNull.Value as object
                };

                // Ejecutar el SP
                await _context.Database.ExecuteSqlRawAsync(
                    "EXEC sp_RegistrarAsistencia @EmpleadoID, @HuellaDigital",
                    empleadoParam,
                    huellaParam);

                // Buscar la asistencia recién registrada
                var asistencia = await _dbSet
                    .Include(a => a.Empleado)
                    .ThenInclude(e => e.Cargo)
                    .Include(a => a.Empleado)
                    .ThenInclude(e => e.Sucursal)
                    .Where(a => a.EmpleadoID == empleadoId && a.Fecha.Date == DateTime.Today)
                    .FirstOrDefaultAsync();

                return asistencia;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Asistencia> RegistrarAsistenciaManualAsync(AsistenciaManualDTO asistenciaDto)
        {
            try
            {
                // Verificar si ya existe la asistencia
                var asistenciaExistente = await _dbSet
                    .FirstOrDefaultAsync(a => a.EmpleadoID == asistenciaDto.EmpleadoID &&
                                             a.Fecha.Date == asistenciaDto.Fecha.Date);

                if (asistenciaExistente != null)
                {
                    // Actualizar la asistencia existente
                    if (asistenciaDto.HoraEntrada.HasValue)
                        asistenciaExistente.HoraEntrada = asistenciaDto.HoraEntrada;

                    if (asistenciaDto.HoraSalida.HasValue)
                        asistenciaExistente.HoraSalida = asistenciaDto.HoraSalida;

                    if (!string.IsNullOrEmpty(asistenciaDto.Observaciones))
                        asistenciaExistente.Observaciones = asistenciaDto.Observaciones;

                    // Actualizar estados según la hora
                    asistenciaExistente.EstadoEntrada = DeterminarEstadoEntrada(asistenciaDto.EmpleadoID, asistenciaDto.Fecha, asistenciaDto.HoraEntrada);
                    asistenciaExistente.EstadoSalida = DeterminarEstadoSalida(asistenciaDto.EmpleadoID, asistenciaDto.Fecha, asistenciaDto.HoraSalida);

                    await _context.SaveChangesAsync();
                    return asistenciaExistente;
                }
                else
                {
                    // Crear nueva asistencia
                    var nuevaAsistencia = new Asistencia
                    {
                        EmpleadoID = asistenciaDto.EmpleadoID,
                        Fecha = asistenciaDto.Fecha.Date,
                        HoraEntrada = asistenciaDto.HoraEntrada,
                        HoraSalida = asistenciaDto.HoraSalida,
                        Observaciones = asistenciaDto.Observaciones,
                        EstadoEntrada = DeterminarEstadoEntrada(asistenciaDto.EmpleadoID, asistenciaDto.Fecha, asistenciaDto.HoraEntrada),
                        EstadoSalida = DeterminarEstadoSalida(asistenciaDto.EmpleadoID, asistenciaDto.Fecha, asistenciaDto.HoraSalida)
                    };

                    await _dbSet.AddAsync(nuevaAsistencia);
                    await _context.SaveChangesAsync();

                    return nuevaAsistencia;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        private string DeterminarEstadoEntrada(int empleadoId, DateTime fecha, DateTime? horaEntrada)
        {
            if (!horaEntrada.HasValue)
                return null;

            try
            {
                // Obtener el horario asignado al empleado para esa fecha
                var horarioEmpleado = _context.HorariosEmpleados
                    .Include(h => h.Horario)
                    .Where(h => h.EmpleadoID == empleadoId && h.FechaInicio <= fecha &&
                               (h.FechaFin == null || h.FechaFin >= fecha) && h.Estado)
                    .OrderByDescending(h => h.FechaInicio)
                    .FirstOrDefault();

                if (horarioEmpleado == null)
                    return "Sin horario asignado";

                var horario = horarioEmpleado.Horario;

                // Calcular minutos de atraso
                var horaEntradaEsperada = fecha.Date.Add(horario.HoraEntrada);
                var minutosAtraso = (int)(horaEntrada.Value - horaEntradaEsperada).TotalMinutes;

                if (minutosAtraso <= 0)
                    return "A tiempo";
                else if (minutosAtraso <= horario.ToleranciaEntrada)
                    return "Tolerancia";
                else
                    return "Tarde";
            }
            catch (Exception)
            {
                return "Error en cálculo";
            }
        }

        private string DeterminarEstadoSalida(int empleadoId, DateTime fecha, DateTime? horaSalida)
        {
            if (!horaSalida.HasValue)
                return null;

            try
            {
                // Obtener el horario asignado al empleado para esa fecha
                var horarioEmpleado = _context.HorariosEmpleados
                    .Include(h => h.Horario)
                    .Where(h => h.EmpleadoID == empleadoId && h.FechaInicio <= fecha &&
                               (h.FechaFin == null || h.FechaFin >= fecha) && h.Estado)
                    .OrderByDescending(h => h.FechaInicio)
                    .FirstOrDefault();

                if (horarioEmpleado == null)
                    return "Sin horario asignado";

                var horario = horarioEmpleado.Horario;

                // Calcular minutos de anticipación
                var horaSalidaEsperada = fecha.Date.Add(horario.HoraSalida);
                var minutosAnticipacion = (int)(horaSalidaEsperada - horaSalida.Value).TotalMinutes;

                if (minutosAnticipacion <= 0)
                    return "Completo";
                else if (minutosAnticipacion <= horario.ToleranciaSalida)
                    return "Tolerancia";
                else
                    return "Temprano";
            }
            catch (Exception)
            {
                return "Error en cálculo";
            }
        }
    }
}