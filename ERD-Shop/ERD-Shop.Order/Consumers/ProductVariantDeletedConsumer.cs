using ERD_Shop.Order.Repository;
using MassTransit;
using Store.Contracts;

namespace ERD_Shop.Order.Consumers
{
    public class ProductVariantDeletedConsumer : IConsumer<OrderProductVariantDeleted>
    {
        private readonly IProductVariantRepository _productVariantRepository;
        public ProductVariantDeletedConsumer(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        public async Task Consume(ConsumeContext<OrderProductVariantDeleted> context)
        {
            var message = context.Message;
            var item = await _productVariantRepository.GetProductVariantId(message.ProductVariantId);
            if (item == null) {
                return;
            }
            await _productVariantRepository.DeleteProductVariant(message.ProductVariantId);
        }
    }
}
