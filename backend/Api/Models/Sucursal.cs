using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DefensoriaAsistencia.Core.Models
{
    public class Sucursal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SucursalID { get; set; }

        [Required]
        public int RegionID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Direccion { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Telefono { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("RegionID")]
        public virtual Region? Region { get; set; }

        public virtual ICollection<Usuario>? Usuarios { get; set; }
        public virtual ICollection<Empleado>? Empleados { get; set; }
        public virtual ICollection<DiaNoLaborable>? DiasNoLaborables { get; set; }
    }
}