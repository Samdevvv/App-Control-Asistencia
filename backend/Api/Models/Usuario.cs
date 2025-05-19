using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DefensoriaAsistencia.Core.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Apellido { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string NombreUsuario { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Contrasena { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        public int RolID { get; set; }

        [Required]
        public int SucursalID { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public DateTime? UltimoAcceso { get; set; }

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("RolID")]
        public virtual Rol? Rol { get; set; }

        [ForeignKey("SucursalID")]
        public virtual Sucursal? Sucursal { get; set; }

        public virtual ICollection<LogSistema>? LogsSistema { get; set; }
        public virtual ICollection<Empleado>? EmpleadosCreados { get; set; }
        public virtual ICollection<DiaNoLaborable>? DiasNoLaborablesCreados { get; set; }
        public virtual ICollection<HorarioEmpleado>? HorariosEmpleadosCreados { get; set; }
        public virtual ICollection<Permiso>? PermisosCreados { get; set; }
        public virtual ICollection<JustificacionAsistencia>? JustificacionesCreadas { get; set; }
    }
}