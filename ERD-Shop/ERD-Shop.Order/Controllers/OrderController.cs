using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        protected ResponseDto _response;
        private IOrderRepository _orderRepository;


        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
            this._response = new ResponseDto();
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
        public async Task<object> CreateUpdate(OrderDto orderDto) 
        {
            try
            {
                OrderDto orderDtos = await _orderRepository.CreateUpdateOrder(orderDto);
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