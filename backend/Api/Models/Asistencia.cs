using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class Asistencia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AsistenciaID { get; set; }

        [Required]
        public int EmpleadoID { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        public DateTime? HoraEntrada { get; set; }

        public DateTime? HoraSalida { get; set; }

        [StringLength(20)]
        public string? EstadoEntrada { get; set; }

        [StringLength(20)]
        public string? EstadoSalida { get; set; }

        public string? Observaciones { get; set; }

        // Navegación
        [ForeignKey("EmpleadoID")]
        public virtual Empleado? Empleado { get; set; }

        public virtual ICollection<JustificacionAsistencia>? Justificaciones { get; set; }
    }
}