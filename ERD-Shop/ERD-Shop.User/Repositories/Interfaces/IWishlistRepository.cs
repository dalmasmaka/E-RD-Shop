using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IWishlistRepository
    {
        Task<IEnumerable<WishlistDto>> GetWishlists();
        Task<WishlistDto> GetWishlistByUser(string userId);
        Task<WishlistDto> CreateWishlist(WishlistDto wishlist);
        Task<bool> DeleteWishlist(string userId);
    }
}
