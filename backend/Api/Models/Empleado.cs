using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Models;

namespace DefensoriaAsistencia.Core.Models
{
    public class Empleado
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmpleadoID { get; set; }

        [Required]
        [StringLength(20)]
        public string Cedula { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Apellido { get; set; } = string.Empty;

        public DateTime? FechaNacimiento { get; set; }

        [StringLength(1)]
        public string? Sexo { get; set; }

        [StringLength(255)]
        public string? Direccion { get; set; }

        [StringLength(20)]
        public string? Telefono { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        public DateTime FechaIngreso { get; set; }

        [Required]
        public int CargoID { get; set; }

        [Required]
        public int SucursalID { get; set; }

        public byte[]? HuellaDigital { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public int? UsuarioCreacion { get; set; }

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("CargoID")]
        public virtual Cargo? Cargo { get; set; }

        [ForeignKey("SucursalID")]
        public virtual Sucursal? Sucursal { get; set; }

        [ForeignKey("UsuarioCreacion")]
        public virtual Usuario? UsuarioCreador { get; set; }

        public virtual ICollection<Asistencia>? Asistencias { get; set; }
        public virtual ICollection<HorarioEmpleado>? HorariosAsignados { get; set; }
        public virtual ICollection<Permiso>? Permisos { get; set; }
    }
}