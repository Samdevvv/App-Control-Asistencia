using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DefensoriaAsistencia.Core.Models
{
    public class Horario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HorarioID { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public TimeSpan HoraEntrada { get; set; }

        [Required]
        public TimeSpan HoraSalida { get; set; }

        public int ToleranciaEntrada { get; set; } = 10;

        public int ToleranciaSalida { get; set; } = 10;

        [StringLength(255)]
        public string? Descripcion { get; set; }

        public bool Estado { get; set; } = true;

        // Navegación
        public virtual ICollection<HorarioEmpleado>? HorariosEmpleados { get; set; }
    }
}