using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<OrderDto>> GetOrders();
        Task<OrderDto> GetOrderById(int orderId);
        Task<OrderDto> CreateOrder(OrderDto orderDto);
        Task<OrderDto> UpdateOrder(OrderDto orderDto);
        Task<bool> DeleteOrder(int orderId);
    }
}