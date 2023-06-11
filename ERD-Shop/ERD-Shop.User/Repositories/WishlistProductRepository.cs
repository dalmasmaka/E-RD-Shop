using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class WishlistProductRepository : IWishlistProductRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        public WishlistProductRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<WishlistProductDto> AddProductToWishlist(WishlistProductDto product)
        {
            Wishlist wishlist = await _db.Wishlists.Where(w => w.ApplicationUserId == product.UserId).FirstOrDefaultAsync();
            IProductVariant productVariant = await _db.ProductVariants.Where(p => p.ProductVariantId == product.ProductId).FirstOrDefaultAsync();
            if (wishlist.WishlistProducts == null)
            {
                wishlist.WishlistProducts = new List<IProductVariant>();
            }
            wishlist.WishlistProducts.Add(productVariant);
            await _db.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteProductFromWishlist(WishlistProductDto wishlistProduct)
        {
            Wishlist wishlist = await _db.Wishlists.Include(w => w.WishlistProducts)
                                                  .FirstOrDefaultAsync(w => w.ApplicationUserId == wishlistProduct.UserId);
            if (wishlist == null)
            {
                return false;
            }
            IProductVariant productVariant = wishlist.WishlistProducts.FirstOrDefault(p => p.ProductVariantId == wishlistProduct.ProductId);

            if (productVariant == null)
            {
                return false;
            }
            wishlist.WishlistProducts.Remove(productVariant);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ClearUserWishlist(string userId)
        {
            Wishlist wishlist = await _db.Wishlists.Include(w => w.WishlistProducts).FirstOrDefaultAsync(w => w.ApplicationUserId == userId);
            if (wishlist == null)
            {
                return false;
            }
            wishlist.WishlistProducts.Clear();
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<IProductVariantDto>> GetAllWishlistProducts()
        {
            List<IProductVariant> products = await _db.Wishlists.SelectMany(w => w.WishlistProducts).ToListAsync();
            return _mapper.Map<List<IProductVariantDto>>(products);
        }

        public async Task<IEnumerable<IProductVariantDto>> GetUserWishlistProducts(string userId)
        {
            Wishlist wishlist = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).FirstOrDefaultAsync();
            List<IProductVariant> products = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).SelectMany(w => w.WishlistProducts).ToListAsync();
            return _mapper.Map<List<IProductVariantDto>>(products);
        }

        public async Task<bool> UserHasProduct(string userId, int productId)
        {
            Wishlist wishlist = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).FirstOrDefaultAsync();
            IProductVariant product = await _db.ProductVariants.Where(p => p.ProductVariantId == productId).FirstOrDefaultAsync();
            List<IProductVariant> products = await _db.Wishlists.Where(w => w.ApplicationUserId == userId).SelectMany(w => w.WishlistProducts).ToListAsync();

            if (products.Contains(product))
            {
                return true;
            }
            return false;
        }
    }
}
