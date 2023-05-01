using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        [Required]
        public ApplicationUser User { get; set; }
        [Required]
        public List<IProductVariant> ProductVariants { get; set; }
    }
}
