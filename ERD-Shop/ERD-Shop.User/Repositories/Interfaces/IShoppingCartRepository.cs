using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IShoppingCartRepository
    {
        Task<IEnumerable<ShoppingCartDto>> GetShoppingCarts();
        Task<ShoppingCartDto> GetShoppingCartByUser(string userId);
        Task<ShoppingCartDto> CreateShoppingCart(ShoppingCartDto shoppingCart);
        Task<bool> DeleteShoppingCart(string userId);
    }
}
