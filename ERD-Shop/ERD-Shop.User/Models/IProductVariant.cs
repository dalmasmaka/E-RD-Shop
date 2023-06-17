using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERD_Shop.User.Models
{
    public class IProductVariant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductVariantId { get; set; }
        [Required]
        public string ProductVariantName { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public List<Wishlist> Wishlists { get; set; }
        [Required]
        public List<ShoppingCart> ShoppingCarts { get; set; }
    }
}
