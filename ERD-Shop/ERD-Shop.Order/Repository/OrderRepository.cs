using AutoMapper;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;
using System.Data.Common;

namespace ERD_Shop.Order.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrdersContext _db;
        private readonly IMapper _mapper;

        public OrderRepository(OrdersContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrder(OrderDto orderDto)
        {
            Models.Order order = _mapper.Map<OrderDto, Models.Order>(orderDto);
            _db.Orders.Add(order);
            await _db.SaveChangesAsync();
            orderDto.OrderId = order.OrderId;
            return _mapper.Map<OrderDto>(orderDto);
        }
        public async Task<OrderDto> UpdateOrder(OrderDto orderDto)
        {
            throw new NotImplementedException();
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
                UserId = x.UserId,
                ShippingAddress = x.ShippingAddress,
                CodeValueId = x.CodeValueId,
                ProductVariants = x.ProductVariants

            }).AsEnumerable();

            return Task.FromResult(model);
        }
    }
}