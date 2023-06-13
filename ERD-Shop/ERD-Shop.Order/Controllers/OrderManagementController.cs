using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using MassTransit.SagaStateMachine;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Order.Contracts;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderManagementController : ControllerBase
    {
        private readonly IOrderProductRepository _orderProductRepository;
        private readonly IPublishEndpoint _publishEndpoint;
        public OrderManagementController(IOrderProductRepository orderProductRepository, IPublishEndpoint publishEndpoint)
        {
            _orderProductRepository = orderProductRepository;
            _publishEndpoint = publishEndpoint;
        }
        [HttpGet]
        public async Task<IActionResult> GetOrderProducts()
        {
            try
            {
                IEnumerable<OrderProductDto> orderProducts = await _orderProductRepository.GetOrderProducts();
                if(!orderProducts.Any())
                {
                    return NotFound("There are no order products.");
                }
                return Ok(orderProducts);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("{orderId}")]
        public async Task<IActionResult> GetOrderProductsById(int orderId)
        {
            try
            {
                IEnumerable<ProductVariantDto> productVariants = await _orderProductRepository.GetOrderProductsById(orderId);
                //IEnumerable<ProductVariantDto> productVariants = new List<ProductVariantDto>();
                if(!productVariants.Any())
                {
                    return NotFound("NOT FOUND");
                }
                return Ok(productVariants);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("/api/OrderManagement/ByUserId/{userId}")]
        public async Task<IActionResult> GetOrderProductsByUser(string userId)
        {
            try
            {
                IEnumerable<ProductVariantDto> products = await _orderProductRepository.GetUserOrderProducts(userId);
                if (!products.Any())
                {
                    return NotFound("User " + userId + " has not ordered any products.");
                }
                return Ok(products);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrderProduct(OrderProductDto orderProduct)
        {
            try
            {
                OrderProductDto order = await _orderProductRepository.CreateOrderProduct(orderProduct);
                await _publishEndpoint.Publish(new WishlistCartProductDeletion(order.ProductId, order.UserId));
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteOrderProduct(OrderProductDto orderProduct)
        {
            try
            {
                bool isDeleted = await _orderProductRepository.DeleteOrderProduct(orderProduct);
                if (isDeleted)
                {
                    return Ok("Product " + orderProduct.ProductId + " is removed from order " + orderProduct.OrderId);
                }
                return NotFound("Either OrderId or ProductId is non existent. Please Check the info provided");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
