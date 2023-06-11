using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class ShoppingCartProductRepository : IShoppingCartProductRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        public ShoppingCartProductRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ShoppingCartProductDto> AddProductToShoppingCart(ShoppingCartProductDto product)
        {
            ShoppingCart shoppingCart = await _db.ShoppingCarts.Where(w => w.ApplicationUserId == product.UserId).FirstOrDefaultAsync();
            IProductVariant productVariant = await _db.ProductVariants.Where(p => p.ProductVariantId == product.ProductId).FirstOrDefaultAsync();
            if (shoppingCart.ProductVariants == null)
            {
                shoppingCart.ProductVariants = new List<IProductVariant>();
            }
            shoppingCart.ProductVariants.Add(productVariant);
            await _db.SaveChangesAsync();
            return product;
        }

        public async Task<bool> ClearUserShoppingCart(string userId)
        {
            ShoppingCart shoppingCart = await _db.ShoppingCarts.Include(w => w.ProductVariants).FirstOrDefaultAsync(w => w.ApplicationUserId == userId);
            if (shoppingCart == null)
            {
                return false;
            }
            shoppingCart.ProductVariants.Clear();
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductFromShoppingCart(ShoppingCartProductDto product)
        {
            ShoppingCart shoppingCart = await _db.ShoppingCarts.Include(w => w.ProductVariants)
                                                  .FirstOrDefaultAsync(w => w.ApplicationUserId == product.UserId);
            if (shoppingCart == null)
            {
                return false;
            }
            IProductVariant productVariant = shoppingCart.ProductVariants.FirstOrDefault(p => p.ProductVariantId == product.ProductId);

            if (productVariant == null)
            {
                return false;
            }
            shoppingCart.ProductVariants.Remove(productVariant);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<IProductVariantDto>> GetAllShoppingCartProducts()
        {
            List<IProductVariant> products = await _db.ShoppingCarts.SelectMany(w => w.ProductVariants).ToListAsync();
            return _mapper.Map<List<IProductVariantDto>>(products);
        }

        public async Task<IEnumerable<IProductVariantDto>> GetUserShoppingCartProducts(string userId)
        {
            ShoppingCart shoppingCart = await _db.ShoppingCarts.Where(w => w.ApplicationUserId == userId).FirstOrDefaultAsync();
            List<IProductVariant> products = await _db.ShoppingCarts.Where(w => w.ApplicationUserId == userId).SelectMany(w => w.ProductVariants).ToListAsync();
            return _mapper.Map<List<IProductVariantDto>>(products);
        }

        public async Task<bool> UserHasProduct(string userId, int productId)
        {
            Wishlist wishlist = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).FirstOrDefaultAsync();
            IProductVariant product = await _db.ProductVariants.Where(p => p.ProductVariantId == productId).FirstOrDefaultAsync();
            List<IProductVariant> products = await _db.ShoppingCarts.Where(w => w.ApplicationUserId == userId).SelectMany(w => w.ProductVariants).ToListAsync();

            if (products.Contains(product))
            {
                return true;
            }
            return false;
        }
    }
}
