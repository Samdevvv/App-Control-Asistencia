using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class JustificacionAsistencia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JustificacionID { get; set; }

        [Required]
        public int AsistenciaID { get; set; }

        [Required]
        public string Justificacion { get; set; } = string.Empty;

        [StringLength(255)]
        public string? DocumentoJustificacion { get; set; }

        public int? UsuarioCreacion { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public bool Estado { get; set; } = true;

        public string? Comentarios { get; set; }

        // Navegación
        [ForeignKey("AsistenciaID")]
        public virtual Asistencia? Asistencia { get; set; }

        [ForeignKey("UsuarioCreacion")]
        public virtual Usuario? UsuarioCreador { get; set; }
    }
}