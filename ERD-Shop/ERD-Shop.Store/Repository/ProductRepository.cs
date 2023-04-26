using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Store.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        private IMapper _mapper;
        public ProductRepository(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateUpdateProduct(ProductDto productDto)
        {
            Product product = _mapper.Map<ProductDto, Product>(productDto);
            if(product.ProductId > 0)
            {
                _context.Products.Update(product);
            }
            else
            {
                _context.Products.Add(product);
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<Product, ProductDto>(product);
        }

        public async Task<bool> DeleteProduct(int ProductId)
        {
            try
            {
                Product product = await _context.Products.SingleOrDefaultAsync(x => x.ProductId == ProductId);
                if (product == null)
                {
                    return false;
                }
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<ProductDto> GetProductById(int ProductId)
        {
            Product product = await _context.Products.Where(x => x.ProductId == ProductId).SingleOrDefaultAsync();
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            IEnumerable<Product> productList = await _context.Products.ToListAsync();
            return _mapper.Map<List<ProductDto>>(productList);
        }
    }
}
