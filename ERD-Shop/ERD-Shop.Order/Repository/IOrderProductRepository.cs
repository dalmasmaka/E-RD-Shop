using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IOrderProductRepository
    {
        public Task<IEnumerable<ProductVariantDto>> GetOrderProducts();
        public Task<IEnumerable<ProductVariantDto>> GetUserOrderProducts(string userId);
        public Task<IEnumerable<ProductVariantDto>> GetOrderProductsById(int orderId);
        public Task<OrderProductDto> CreateOrderProduct(OrderProductDto orderProductDto);
        public Task<bool> DeleteOrderProduct(OrderProductDto orderProductDto);
    }
}
