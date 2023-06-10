using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using System.Data.Common;

namespace ERD_Shop.Order.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrdersContext _db;

        public OrderRepository(OrdersContext db)
        {
            _db = db;
        }

        public Task<OrderDto> CreateUpdateOrder(OrderDto orderDto)
        {
            var model = new ERD_Shop.Order.Models.Order();
            model.OrderId = orderDto.OrderId;
            model.OrderDate = DateTime.Now;
            model.ShippingAddress = orderDto.ShippingAddress;
            model.UserId = orderDto.UserId;
            model.CodeValueId = orderDto.CodeValueId;
            model.TotalPrice = orderDto.TotalPrice;

            if (orderDto.OrderId == 0)
            {
                // CREATE



                _db.Orders.Add(model);
                _db.SaveChanges();
            }
            else
            {
                _db.Orders.Update(model);
                _db.SaveChanges();
                // Edit
            }

            return Task.FromResult(orderDto);


        }

        public Task<bool> DeleteOrder(int orderId)
        {
            var model = _db.Orders.FirstOrDefault(x => x.OrderId == orderId);

            if(model != null)
            {
                _db.Orders.Remove(model);
                bool isRemoved = _db.SaveChanges() > 0;
                return Task.FromResult(isRemoved);
            }

            return Task.FromResult(false);

        }

        public Task<OrderDto> GetOrderById(int orderId)
        {
            var order = _db.Orders.FirstOrDefault(x => x.OrderId == orderId);
            // Map the order entity to an OrderDto object

            var dto = new OrderDto()
            {
                OrderId = order.OrderId,

            };
            // orderDto = _mapper.Map<OrderDto>(order);
            return Task.FromResult(dto);
        }

        public Task<IEnumerable<OrderDto>> GetOrders()
        {
            var data = _db.Orders.ToList();

            var model = data.Select(x => new OrderDto
            {
                OrderId = x.OrderId,
                OrderDate = x.OrderDate,
                TotalPrice = x.TotalPrice,
                ShippingAddress = x.ShippingAddress,
                UserId = x.UserId,
                CodeValueId = x.CodeValueId,
                Refunds = x.Refunds,
                CodeValue = x.CodeValue,
                User = x.User,
                ProductVariants = x.ProductVariants

            }).AsEnumerable();

            return Task.FromResult(model);
        }
    }
}