using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IShoppingCartProductRepository
    {
        public Task<IEnumerable<IProductVariantDto>> GetAllShoppingCartProducts();
        public Task<IEnumerable<IProductVariantDto>> GetUserShoppingCartProducts(string userId);
        public Task<bool> UserHasProduct(string userId, int productId);
        public Task<bool> DeleteProductFromShoppingCart(ShoppingCartProductDto product);
        public Task<bool> ClearUserShoppingCart(string userId);
        public Task<ShoppingCartProductDto> AddProductToShoppingCart(ShoppingCartProductDto product);
    }
}
