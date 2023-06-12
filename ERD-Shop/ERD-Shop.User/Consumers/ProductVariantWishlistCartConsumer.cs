using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using MassTransit;
using Order.Contracts;

namespace ERD_Shop.User.Consumers
{
    public class ProductVariantWishlistCartConsumer : IConsumer<WishlistCartProductDeletion>
    {
        private readonly IShoppingCartProductRepository _shoppingCartProductRepository;
        private readonly IWishlistProductRepository _wishlistProductRepository;
        public ProductVariantWishlistCartConsumer(IShoppingCartProductRepository shoppingCartProductRepository, IWishlistProductRepository wishlistProductRepository)
        {
            _shoppingCartProductRepository = shoppingCartProductRepository;
            _wishlistProductRepository = wishlistProductRepository;
        }

        public async Task Consume(ConsumeContext<WishlistCartProductDeletion> context)
        {
            var message = context.Message;
            var item = await _shoppingCartProductRepository.UserHasProduct(message.UserId, message.ProductVariantId);
            if (!item)
            {
                item = await _wishlistProductRepository.UserHasProduct(message.UserId, message.ProductVariantId);
                if (!item)
                {
                    return;
                }
                WishlistProductDto wishlistProductDto = new WishlistProductDto { UserId = message.UserId, ProductId = message.ProductVariantId };
                await _wishlistProductRepository.DeleteProductFromWishlist(wishlistProductDto);
                return;
            }
            ShoppingCartProductDto shoppingCartProductDto = new ShoppingCartProductDto { UserId = message.UserId, ProductId = message.ProductVariantId };
            await _shoppingCartProductRepository.DeleteProductFromShoppingCart(shoppingCartProductDto);
        }
    }
}
