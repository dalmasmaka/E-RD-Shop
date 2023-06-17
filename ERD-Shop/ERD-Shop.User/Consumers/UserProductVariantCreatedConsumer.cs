using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using MassTransit;
using Store.Contracts;

namespace ERD_Shop.User.Consumers
{
    public class UserProductVariantCreatedConsumer : IConsumer<UserProductVariantCreated>
    {
        private readonly IProductVariantRepository _productVariantRepository;
        public UserProductVariantCreatedConsumer(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        public async Task Consume(ConsumeContext<UserProductVariantCreated> context)
        {
            var message = context.Message;
            var item = await _productVariantRepository.GetProductVariantById(message.ProductVariantId);
            if (item != null)
            {
                return;
            }
            item = new IProductVariantDto { ProductVariantId = message.ProductVariantId, ProductVariantName = message.ProductVariantName, Price = message.ProductVariantPrice };
            await _productVariantRepository.CreateProductVariant(item);
        }
    }
}
