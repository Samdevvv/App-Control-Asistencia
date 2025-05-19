using DefensoriaAsistencia.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DefensoriaAsistencia.Data.Context
{
    public class DefensoriaDbContext : DbContext
    {
        public DefensoriaDbContext(DbContextOptions<DefensoriaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Region> Regiones { get; set; }
        public DbSet<Sucursal> Sucursales { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<LogSistema> LogSistema { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Horario> Horarios { get; set; }
        public DbSet<Asistencia> Asistencias { get; set; }
        public DbSet<DiaNoLaborable> DiasNoLaborables { get; set; }
        public DbSet<HorarioEmpleado> HorariosEmpleados { get; set; }
        public DbSet<TipoPermiso> TiposPermisos { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<JustificacionAsistencia> JustificacionesAsistencias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración para Region
            modelBuilder.Entity<Region>()
                .Property(r => r.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Region>()
                .Property(r => r.Estado)
                .HasDefaultValue(true);

            // Configuración para Sucursal
            modelBuilder.Entity<Sucursal>()
                .Property(s => s.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Sucursal>()
                .Property(s => s.Estado)
                .HasDefaultValue(true);

            // Configuración para Rol
            modelBuilder.Entity<Rol>()
                .Property(r => r.Estado)
                .HasDefaultValue(true);

            // Configuración para Departamento
            modelBuilder.Entity<Departamento>()
                .Property(d => d.Estado)
                .HasDefaultValue(true);

            // Configuración para Cargo
            modelBuilder.Entity<Cargo>()
                .Property(c => c.Estado)
                .HasDefaultValue(true);

            // Configuración para Usuario
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.NombreUsuario)
                .IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique()
                .HasFilter("[Email] IS NOT NULL");

            modelBuilder.Entity<Usuario>()
                .Property(u => u.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Estado)
                .HasDefaultValue(true);

            // Configuración para LogSistema
            modelBuilder.Entity<LogSistema>()
                .Property(l => l.Fecha)
                .HasDefaultValueSql("GETDATE()");

            // Configuración para Empleado
            modelBuilder.Entity<Empleado>()
                .HasIndex(e => e.Cedula)
                .IsUnique();

            modelBuilder.Entity<Empleado>()
                .Property(e => e.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Empleado>()
                .Property(e => e.Estado)
                .HasDefaultValue(true);

            // Configuración para Horario
            modelBuilder.Entity<Horario>()
                .Property(h => h.ToleranciaEntrada)
                .HasDefaultValue(10);

            modelBuilder.Entity<Horario>()
                .Property(h => h.ToleranciaSalida)
                .HasDefaultValue(10);

            modelBuilder.Entity<Horario>()
                .Property(h => h.Estado)
                .HasDefaultValue(true);

            // Configuración para DiaNoLaborable
            modelBuilder.Entity<DiaNoLaborable>()
                .Property(d => d.AplicaTodasSucursales)
                .HasDefaultValue(true);

            modelBuilder.Entity<DiaNoLaborable>()
                .Property(d => d.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<DiaNoLaborable>()
                .Property(d => d.Estado)
                .HasDefaultValue(true);

            // Configuración para HorarioEmpleado
            modelBuilder.Entity<HorarioEmpleado>()
                .Property(h => h.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<HorarioEmpleado>()
                .Property(h => h.Estado)
                .HasDefaultValue(true);

            // Configuración para TipoPermiso
            modelBuilder.Entity<TipoPermiso>()
                .Property(t => t.RequiereJustificacion)
                .HasDefaultValue(true);

            modelBuilder.Entity<TipoPermiso>()
                .Property(t => t.AfectaSalario)
                .HasDefaultValue(false);

            modelBuilder.Entity<TipoPermiso>()
                .Property(t => t.Estado)
                .HasDefaultValue(true);

            // Configuración para Permiso
            modelBuilder.Entity<Permiso>()
                .Property(p => p.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Permiso>()
                .Property(p => p.Estado)
                .HasDefaultValue(true);

            // Configuración para JustificacionAsistencia
            modelBuilder.Entity<JustificacionAsistencia>()
                .Property(j => j.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<JustificacionAsistencia>()
                .Property(j => j.Estado)
                .HasDefaultValue(true);
        }
    }
}