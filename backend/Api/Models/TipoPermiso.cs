using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class TipoPermiso
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TipoPermisoID { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Descripcion { get; set; }

        public bool RequiereJustificacion { get; set; } = true;

        public bool AfectaSalario { get; set; } = false;

        public bool Estado { get; set; } = true;

        // Navegación
        public virtual ICollection<Permiso>? Permisos { get; set; }
    }
}
