using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class DiaNoLaborable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiaNoLaborableID { get; set; }

        [Required]
        public DateTime Fecha { get; set; }

        [Required]
        [StringLength(255)]
        public string Descripcion { get; set; } = string.Empty;

        public bool AplicaTodasSucursales { get; set; } = true;

        public int? SucursalID { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public int? UsuarioCreacion { get; set; }

        public bool Estado { get; set; } = true;

        // Navegación
        [ForeignKey("SucursalID")]
        public virtual Sucursal? Sucursal { get; set; }

        [ForeignKey("UsuarioCreacion")]
        public virtual Usuario? UsuarioCreador { get; set; }
    }
}