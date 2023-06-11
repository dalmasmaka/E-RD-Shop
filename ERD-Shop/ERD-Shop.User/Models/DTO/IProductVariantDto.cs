using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models.DTO
{
    public class IProductVariantDto
    {
        [Key]
        public int ProductVariantId { get; set; }
        [Required]
        public string ProductVariantName { get; set; }
        [Required]
        public float Price { get; set; }
    }
}
