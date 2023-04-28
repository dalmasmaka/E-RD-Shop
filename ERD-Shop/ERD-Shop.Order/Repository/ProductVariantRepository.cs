using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public class ProductVariantRepository : IProductVariantRepository
    {

        private readonly OrdersContext _db;
        public ProductVariantRepository(OrdersContext db) {
            db = _db;
        }

        public Task<ProductVariantDto> CreateUpdateProductVariant(ProductVariantDto productVariantDto)
        {
            var model = new ERD_Shop.Order.Models.ProductVariant();
            model.ProductVariantId = productVariantDto.ProductVariantId;
            model.Name = productVariantDto.Name;
            model.Price = productVariantDto.Price;

            if (productVariantDto.ProductVariantId == 0)
            {
                // CREATE



                _db.ProductVariants.Add(model);
                _db.SaveChanges();
            }
            else
            {
                _db.ProductVariants.Update(model);
                _db.SaveChanges();
                // Edit
            }

            return Task.FromResult(productVariantDto);
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