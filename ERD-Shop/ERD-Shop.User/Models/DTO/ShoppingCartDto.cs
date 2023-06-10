using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.User.Models.DTO
{
    public class ShoppingCartDto
    {
        public int? ShoppingCartId { get; set; }
        public string ApplicationUserId { get; set; }
    }
}
