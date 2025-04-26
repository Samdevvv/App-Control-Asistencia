using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class Permiso
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PermisoID { get; set; }

        [Required]
        public int EmpleadoID { get; set; }

        [Required]
        public int TipoPermisoID { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }

        [Required]
        public DateTime FechaFin { get; set; }

        public string? Justificacion { get; set; }

        [StringLength(255)]
        public string? DocumentoJustificacion { get; set; }

        public int? UsuarioCreacion { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public bool Estado { get; set; } = true;

        public string? Comentarios { get; set; }

        // Navegación
        [ForeignKey("EmpleadoID")]
        public virtual Empleado? Empleado { get; set; }

        [ForeignKey("TipoPermisoID")]
        public virtual TipoPermiso? TipoPermiso { get; set; }

        [ForeignKey("UsuarioCreacion")]
        public virtual Usuario? UsuarioCreador { get; set; }
    }
}