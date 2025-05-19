using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class HorarioEmpleado
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HorarioEmpleadoID { get; set; }

        [Required]
        public int EmpleadoID { get; set; }

        [Required]
        public int HorarioID { get; set; }

        [Required]
        public DateTime FechaInicio { get; set; }

        public DateTime? FechaFin { get; set; }

        public int? UsuarioCreacion { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("EmpleadoID")]
        public virtual Empleado? Empleado { get; set; }

        [ForeignKey("HorarioID")]
        public virtual Horario? Horario { get; set; }

        [ForeignKey("UsuarioCreacion")]
        public virtual Usuario? UsuarioCreador { get; set; }
    }
}