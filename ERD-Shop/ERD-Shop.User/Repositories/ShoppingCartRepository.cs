using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        public ShoppingCartRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<ShoppingCartDto> CreateShoppingCart(ShoppingCartDto shoppingCart)
        {
            ShoppingCart _shoppingCart = _mapper.Map<ShoppingCartDto, ShoppingCart>(shoppingCart);
            _db.ShoppingCarts.Add(_shoppingCart);
            await _db.SaveChangesAsync();
            return _mapper.Map<ShoppingCartDto>(_shoppingCart);
        }

        public async Task<bool> DeleteShoppingCart(string userId)
        {
            try
            {
                ShoppingCart shoppingCart = await _db.ShoppingCarts.Where(s => s.ApplicationUserId == userId).FirstOrDefaultAsync();
                if (shoppingCart != null)
                {
                    _db.ShoppingCarts.Remove(shoppingCart);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<ShoppingCartDto> GetShoppingCartByUser(string userId)
        {
            ShoppingCart shoppingCart = await _db.ShoppingCarts.Where(s => s.ApplicationUserId == userId).FirstOrDefaultAsync();
            return _mapper.Map<ShoppingCartDto>(shoppingCart);
        }

        public async Task<IEnumerable<ShoppingCartDto>> GetShoppingCarts()
        {
            IEnumerable<ShoppingCart> shoppingCarts = await _db.ShoppingCarts.ToListAsync();
            return _mapper.Map<List<ShoppingCartDto>>(shoppingCarts);
        }
    }
}
