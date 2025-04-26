using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefensoriaAsistencia.Core.Models
{
    public class LogSistema
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogID { get; set; }

        public int? UsuarioID { get; set; }

        public DateTime Fecha { get; set; } = DateTime.Now;

        [Required]
        [StringLength(100)]
        public string Accion { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Tabla { get; set; } = string.Empty;

        public int? Registro { get; set; }

        public string? Detalles { get; set; }

        // Navegación
        [ForeignKey("UsuarioID")]
        public virtual Usuario? Usuario { get; set; }
    }
}
