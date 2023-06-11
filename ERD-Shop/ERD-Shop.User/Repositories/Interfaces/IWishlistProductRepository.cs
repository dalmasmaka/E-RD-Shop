using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using Microsoft.OpenApi.Models;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IWishlistProductRepository
    {
        public Task<IEnumerable<IProductVariantDto>> GetAllWishlistProducts();
        public Task<IEnumerable<IProductVariantDto>> GetUserWishlistProducts(string userId);
        public Task<bool> UserHasProduct(string userId, int productId);
        public Task<bool> DeleteProductFromWishlist(WishlistProductDto wishlistProduct);
        public Task<bool> ClearUserWishlist(string userId);
        public Task<WishlistProductDto> AddProductToWishlist(WishlistProductDto product);
    }
}
