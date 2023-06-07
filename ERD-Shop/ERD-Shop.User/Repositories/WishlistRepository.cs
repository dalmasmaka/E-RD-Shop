using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {
        ApplicationDbContext _db;
        IMapper _mapper;
        public WishlistRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<WishlistDto> CreateWishlist(WishlistDto wishlist)
        {
            Wishlist _wishlist = _mapper.Map<WishlistDto, Wishlist>(wishlist);
            _db.Add(_wishlist);
            await _db.SaveChangesAsync();
            return wishlist;
        }

        public async Task<bool> DeleteWishlist(string userId)
        {
            try
            {
                Wishlist _wishlist = await _db.Wishlists.FirstOrDefaultAsync(w => w.ApplicationUserId == userId);
                if(_wishlist == null)
                {
                    return false;
                }
                _db.Remove(_wishlist);
                await _db.SaveChangesAsync();
                return true;
            }catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<WishlistDto> GetWishlistByUser(string userId)
        {
            Wishlist wishlist = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).FirstOrDefaultAsync();
            return _mapper.Map<WishlistDto>(wishlist);
        }

        public async Task<IEnumerable<WishlistDto>> GetWishlists()
        {
            IEnumerable<Wishlist> wishlists = await _db.Wishlists.ToListAsync();
            return _mapper.Map<List<WishlistDto>>(wishlists);
        }
    }
}
