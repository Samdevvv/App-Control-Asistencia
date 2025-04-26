using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DefensoriaAsistencia.Core.Models
{
    public class Cargo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CargoID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Descripcion { get; set; }

        [Required]
        public int DepartamentoID { get; set; }

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("DepartamentoID")]
        public virtual Departamento? Departamento { get; set; }

        public virtual ICollection<Empleado>? Empleados { get; set; }
    }
}