using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using MassTransit.SagaStateMachine;
using Microsoft.AspNetCore.Mvc;
using Order.Contracts;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        protected ResponseDto _response;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderProductRepository _orderProductRepository;
        private readonly IDiscountCodeRepository _discountCodeRepository;
        private readonly IPublishEndpoint _publishEndpoint;

        public OrderController(IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IDiscountCodeRepository discountCodeRepository, IPublishEndpoint publishEndpoint)
        {
            _orderRepository = orderRepository;
            _orderProductRepository = orderProductRepository;
            _discountCodeRepository = discountCodeRepository;
            _response = new ResponseDto();
            _publishEndpoint = publishEndpoint;
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<OrderDto> orderDtos = await _orderRepository.GetOrders();
                _response.Result = orderDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<object> Get(int id)
        {
            try
            {
                OrderDto orderDtos = await _orderRepository.GetOrderById(id);
                _response.Result = orderDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async Task<object> Create(OrderDto orderDto)
        {
            try
            {
                if(orderDto.CodeValueId > 0)
                {
                    DiscountCodeDto discountCode = await _discountCodeRepository.GetDiscountCodeId((int)orderDto.CodeValueId);
                    if(discountCode == null)
                    {
                        return new ResponseDto { IsSuccess = false, DisplayMessage = "The discount code "+orderDto.CodeValueId+" does not exist."};
                    }
                    else if(orderDto.UserId != discountCode.UserId)
                    {
                        return new ResponseDto { IsSuccess = false, DisplayMessage = "The discount code " + orderDto.CodeValueId + " is not reedemable" };
                    }
                    else if(discountCode.UsageLimit == 0)
                    {
                        return new ResponseDto { IsSuccess = false, DisplayMessage = "The discount code " + orderDto.CodeValueId + " has reached its usage limit." };
                    }
                    await _discountCodeRepository.UseDiscountCode((int)orderDto.CodeValueId);
                }
                OrderDto order = await _orderRepository.CreateOrder(orderDto);
                if (orderDto.ProductVariants.Any())
                {
                    IEnumerable<ProductVariant> products = orderDto.ProductVariants.ToList();
                    foreach (ProductVariant productVariant in products)
                    {
                        await _orderProductRepository.CreateOrderProduct(new OrderProductDto { OrderId = order.OrderId, ProductId = productVariant.ProductVariantId });
                        await _publishEndpoint.Publish(new WishlistCartProductDeletion(productVariant.ProductVariantId, orderDto.UserId));
                    }
                }
                _response.Result = orderDto;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<object> Update(OrderDto orderDto)
        {
            try
            {
                OrderDto orderDtos = await _orderRepository.UpdateOrder(orderDto);
                _response.Result = orderDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<object> DeleteOrder(int orderId)
        {
            try
            {
                bool isDeleted = await _orderRepository.DeleteOrder(orderId);
                _response.Result = isDeleted;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}