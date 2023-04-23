using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class Wishlist
    {
        [Key]
        public int WishlistId { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<IProductVariant> WishlistProducts { get; set; }
    }
}
