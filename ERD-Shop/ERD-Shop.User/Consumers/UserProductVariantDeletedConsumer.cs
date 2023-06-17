using ERD_Shop.User.Repositories;
using ERD_Shop.User.Repositories.Interfaces;
using MassTransit;
using Store.Contracts;

namespace ERD_Shop.User.Consumers
{
    public class UserProductVariantDeletedConsumer : IConsumer<UserProductVariantDeleted>
    {
        private readonly IProductVariantRepository _productVariantRepository;
        public UserProductVariantDeletedConsumer(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        public async Task Consume(ConsumeContext<UserProductVariantDeleted> context)
        {
            var message = context.Message;
            var item = await _productVariantRepository.GetProductVariantById(message.Id);
            if (item == null)
            {
                return;
            }
            await _productVariantRepository.DeleteProductVariant(message.Id);
        }
    }
}
