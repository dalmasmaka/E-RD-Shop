using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using Store.Contracts;

namespace ERD_Shop.Order.Consumers
{
    public class ProductVariantUpdatedConsumer : IConsumer<OrderProductVariantUpdated>
    {
        private IProductVariantRepository _productVariantRepository;
        public ProductVariantUpdatedConsumer(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        public async Task Consume(ConsumeContext<OrderProductVariantUpdated> context)
        {
            var message = context.Message;
            var item = await _productVariantRepository.GetProductVariantId(message.ProductVariantId);
            if (item.ProductVariantId != message.ProductVariantId)
            {
                item = new ProductVariantDto { ProductVariantId = message.ProductVariantId, Name = message.ProductVariantName, Price = message.ProductVariantPrice };
                await _productVariantRepository.CreateProductVariant(item);
                return;
            }
            item = new ProductVariantDto { ProductVariantId = message.ProductVariantId, Name = message.ProductVariantName, Price = message.ProductVariantPrice };
            await _productVariantRepository.UpdateProductVariant(item);
        }
    }
}
