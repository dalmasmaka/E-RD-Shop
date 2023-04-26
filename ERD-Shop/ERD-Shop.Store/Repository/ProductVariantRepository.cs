using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Store.Repository
{
    public class ProductVariantRepository : IProductVariantRepository
    {
        private readonly StoreContext _context;
        private IMapper _mapper;
        public ProductVariantRepository(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductVariantDto> CreateUpdateProductVariant(ProductVariantDto productVariantDto)
        {
            ProductVariant productVariant = _mapper.Map<ProductVariantDto, ProductVariant>(productVariantDto);
            if(productVariant.ProductVariantId > 0)
            {
                _context.ProductVariants.Update(productVariant);
            }
            else
            {
                _context.ProductVariants.Add(productVariant);
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<ProductVariant, ProductVariantDto>(productVariant);
        }

        public async Task<bool> DeleteProductVariant(int ProductVariantId)
        {
            try
            {
                ProductVariant productVariant = await _context.ProductVariants.SingleOrDefaultAsync(x=>x.ProductVariantId== ProductVariantId);
                if (productVariant == null)
                {
                    return false;
                }
                _context.ProductVariants.Remove(productVariant);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<ProductVariantDto> GetProductVariantById(int ProductVariantId)
        {
            ProductVariant productVariant = await _context.ProductVariants.Where(x => x.ProductVariantId== ProductVariantId).SingleOrDefaultAsync();
            return _mapper.Map<ProductVariantDto>(productVariant);
        }

        public async Task<IEnumerable<ProductVariantDto>> GetProductVariants()
        {
            IEnumerable<ProductVariant> productVariantList = await _context.ProductVariants.ToListAsync();
            return _mapper.Map<List<ProductVariantDto>>(productVariantList);
        }
    }
}
