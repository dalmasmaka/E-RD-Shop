using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class IProductVariant
    {
        [Key]
        public int ProductVariantId { get; set; }
        public string ProductVariantName { get; set; }
        public float Price { get; set; }
        public List<Wishlist> Wishlists { get; set; }
        public List<ShoppingCart> ShoppingCarts { get; set;}
    }
}
