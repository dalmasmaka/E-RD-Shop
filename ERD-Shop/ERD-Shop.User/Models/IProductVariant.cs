using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class IProductVariant
    {
        [Key]
        public int ProductVariantId { get; set; }
        [Required]
        public string ProductVariantName { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public List<Wishlist> Wishlists { get; set; }
        [Required]
        public List<ShoppingCart> ShoppingCarts { get; set;}
    }
}
