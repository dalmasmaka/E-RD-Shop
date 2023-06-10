using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class ProductVariantRepository : IProductVariantRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        public ProductVariantRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IProductVariantDto> CreateProductVariant(IProductVariantDto productVariant)
        {
            IProductVariant product = _mapper.Map<IProductVariantDto, IProductVariant>(productVariant);
            _db.ProductVariants.Add(product);
            await _db.SaveChangesAsync();
            return productVariant;
        }

        public async Task<bool> DeleteProductVariant(int id)
        {
            IProductVariant product = await _db.ProductVariants.FirstOrDefaultAsync(p => p.ProductVariantId == id);
            if(product == null)
            {
                return false;
            }
            _db.ProductVariants.Remove(product);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IProductVariantDto> GetProductVariantById(int id)
        {
            IProductVariant product = await _db.ProductVariants.Where(p => p.ProductVariantId == id).FirstOrDefaultAsync();
            return _mapper.Map<IProductVariantDto>(product);
        }

        public async Task<IEnumerable<IProductVariantDto>> GetProductVariants()
        {
            IEnumerable<IProductVariant> productVariants = await _db.ProductVariants.ToListAsync();
            return _mapper.Map<List<IProductVariantDto>>(productVariants);
        }

        public async Task<IProductVariantDto> UpdateProductVariant(IProductVariantDto productVariant)
        {
            IProductVariant product = _mapper.Map<IProductVariantDto, IProductVariant>(productVariant);
            _db.ProductVariants.Update(product);
            await _db.SaveChangesAsync();
            return productVariant;
        }
    }
}
