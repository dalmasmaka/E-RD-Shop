﻿using AutoMapper;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Order.Repository
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly OrdersContext _db;
        private readonly IMapper _mapper;
        public OrderProductRepository(OrdersContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<OrderProductDto> CreateOrderProduct(OrderProductDto orderProductDto)
        {
            Models.Order order = await _db.Orders.Where(o => o.OrderId == orderProductDto.OrderId).FirstOrDefaultAsync();
            ProductVariant productVariant = await _db.ProductVariants.Where(p => p.ProductVariantId == orderProductDto.ProductId).FirstOrDefaultAsync();
            order.ProductVariants.Add(productVariant);
            await _db.SaveChangesAsync();
            orderProductDto.UserId = order.UserId;
            return orderProductDto;
        }

        public async Task<bool> DeleteOrderProduct(OrderProductDto orderProductDto)
        {
            Models.Order order = await _db.Orders.Where(o => o.OrderId == orderProductDto.OrderId).FirstOrDefaultAsync();
            ProductVariant productVariant = await _db.ProductVariants.Where(p => p.ProductVariantId == orderProductDto.ProductId).FirstOrDefaultAsync();
            if(order == null || productVariant == null)
            {
                return false;
            }
            order.ProductVariants.Remove(productVariant);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<OrderProductDto>> GetOrderProducts()
        {
            IEnumerable<Models.Order> orders = await _db.Orders.ToListAsync();
            List<OrderProductDto> orderProducts = new List<OrderProductDto>();
            IEnumerable<ProductVariant> products = new List<ProductVariant>();
            foreach (Models.Order order in orders)
            {
                products = await _db.Orders.Where(o => o.OrderId == order.OrderId).SelectMany(o => o.ProductVariants).ToListAsync();
                foreach(ProductVariant product in products)
                {
                    orderProducts.Add(new OrderProductDto { OrderId = order.OrderId, ProductId = product.ProductVariantId, UserId = order.UserId });
                }
            }
            return _mapper.Map<List<OrderProductDto>>(orderProducts);
        }

        public async Task<IEnumerable<ProductVariantDto>> GetOrderProductsById(int orderId)
        {
            IEnumerable<ProductVariant> products = await _db.Orders.Where(o => o.OrderId == orderId).SelectMany(o => o.ProductVariants).ToListAsync();
            return _mapper.Map<List<ProductVariantDto>>(products);
        }

        public async Task<IEnumerable<ProductVariantDto>> GetUserOrderProducts(string userId)
        {
            IEnumerable<ProductVariant> products = await _db.Orders.Where(o => o.UserId == userId).SelectMany(o => o.ProductVariants).ToListAsync();
            return _mapper.Map<List<ProductVariantDto>>(products);
        }
    }
}
