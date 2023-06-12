using AutoMapper;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public class ProductVariantRepository : IProductVariantRepository
    {

        private readonly OrdersContext _db;
        private readonly IMapper _mapper;
        public ProductVariantRepository(OrdersContext db, IMapper mapper) {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductVariantDto> CreateProductVariant(ProductVariantDto productVariantDto)
        {
            ProductVariant productVariant = _mapper.Map<ProductVariantDto, ProductVariant>(productVariantDto);
            _db.ProductVariants.Add(productVariant);
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductVariantDto>(productVariant);
        }
        public Task<ProductVariantDto> UpdateProductVariant(ProductVariantDto productVariantDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteProductVariant(int productVariantId)
        {
            var model = _db.ProductVariants.FirstOrDefault(x => x.ProductVariantId == productVariantId);

            if (model != null)
            {
                _db.ProductVariants.Remove(model);
                bool isRemoved = _db.SaveChanges() > 0;
                return Task.FromResult(isRemoved);
            }

            return Task.FromResult(false);
        }

        public Task<ProductVariantDto> GetProductVariantId(int productVariantId)
        {
            var prod = _db.ProductVariants.FirstOrDefault(x => x.ProductVariantId == productVariantId);

            var dto = new ProductVariantDto()
            {
                ProductVariantId = prod.ProductVariantId,

            };
            // orderDto = _mapper.Map<OrderDto>(order);
            return Task.FromResult(dto);
        }

        public Task<IEnumerable<ProductVariantDto>> GetProductVariants()
        {
            var data = _db.ProductVariants.ToList();

            var model = data.Select(x => new ProductVariantDto
            {
                ProductVariantId = x.ProductVariantId,
                Name = x.Name,
                Price = x.Price
            }).AsEnumerable();

            return Task.FromResult(model);
        }
    }
}