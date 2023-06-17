using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using Store.Contracts;

namespace ERD_Shop.Order.Consumers
{
    public class ProductVariantCreatedConsumer : IConsumer<OrderProductVariantCreated>
    {
        private readonly IProductVariantRepository _productVariantRepository;
        public ProductVariantCreatedConsumer(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        public async Task Consume(ConsumeContext<OrderProductVariantCreated> context)
        {
            var message = context.Message;
            var item = await _productVariantRepository.GetProductVariantId(message.ProductVariantId);
            if (item != null)
            {
                return;
            }
            item = new ProductVariantDto { ProductVariantId = message.ProductVariantId, Name = message.ProductVariantName, Price = message.ProductVariantPrice };
            await _productVariantRepository.CreateProductVariant(item);
        }
    }
}
