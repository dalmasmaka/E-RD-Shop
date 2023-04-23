using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class ShoppingCart
    {
        [Key]
        public int ShoppingCartId { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<IProductVariant> ProductVariants { get; set; }
    }
}
