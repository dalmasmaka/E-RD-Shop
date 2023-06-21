using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private ResponseDto _responseDto;
        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository, ResponseDto responseDto)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _responseDto = responseDto;
        }
        [HttpGet]
        public async Task<IActionResult> GetShoppingCarts()
        {
            try
            {
                IEnumerable<ShoppingCartDto> shoppingCarts = await _shoppingCartRepository.GetShoppingCarts();
                if(!shoppingCarts.Any())
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "There are no shopping carts in your database! Please check if there are any users in your database." };
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = shoppingCarts };
                return StatusCode(StatusCodes.Status200OK, _responseDto);

            }catch(Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetShoppingCartByUser(string userId)
        {
            try
            {
                ShoppingCartDto shoppingCart = await _shoppingCartRepository.GetShoppingCartByUser(userId);
                if(shoppingCart == null)
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "User " + userId + " does not have a Shopping Cart. Please check if the registration was successful!" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = shoppingCart };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }catch(Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateShoppingCart(ShoppingCartDto shoppingCart)
        {
            try
            {
                ShoppingCartDto existsShoppingCart = await _shoppingCartRepository.GetShoppingCartByUser(shoppingCart.ApplicationUserId);
                if(existsShoppingCart != null)
                {
                    _responseDto = new ResponseDto { IsSuccess = false, Message = "User "+shoppingCart.ApplicationUserId+" already has a Shopping Cart" };
                    return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
                }
                ShoppingCartDto _shoppingCart = await _shoppingCartRepository.CreateShoppingCart(shoppingCart);
                _responseDto = new ResponseDto { IsSuccess = true, Result = _shoppingCart, Message = "Shopping Cart for user " + shoppingCart.ApplicationUserId + " is created!" };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
    }
}
