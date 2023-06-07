using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models
{
    public class Wishlist
    {
        [Key]
        public int? WishlistId { get; set; }
        [Required]
        public string ApplicationUserId { get; set; }
        [Required]
        public ApplicationUser User { get; set; }
        [Required]
        public List<IProductVariant> WishlistProducts { get; set; }
    }
}
