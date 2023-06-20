using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartManagementController : ControllerBase
    {
        private readonly IShoppingCartProductRepository _shoppingCartProductRepository;
        private readonly IWishlistProductRepository _wishlistProductRepository;
        private ResponseDto _responseDto;
        public ShoppingCartManagementController(IShoppingCartProductRepository shoppingCartRepository, IWishlistProductRepository wishlistProductRepository, ResponseDto responseDto)
        {
            _shoppingCartProductRepository = shoppingCartRepository;
            _wishlistProductRepository = wishlistProductRepository;
            _responseDto = responseDto;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllShoppingCartProducts()
        {
            try
            {
                IEnumerable<IProductVariantDto> shoppingCartProducts = await _shoppingCartProductRepository.GetAllShoppingCartProducts();
                if (!shoppingCartProducts.Any())
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "There are no products in the shopping cart!" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = shoppingCartProducts, Message = "Here are all of the shopping cart products from every user" };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserShoppingCartProducts(string id)
        {
            try
            {
                IEnumerable<IProductVariantDto> shoppingCartProducts = await _shoppingCartProductRepository.GetUserShoppingCartProducts(id);
                if (!shoppingCartProducts.Any())
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "There are no products in the shopping cart!" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = shoppingCartProducts, Message = "Here are all the products in the shopping cart of user: " + id };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddProductVariantToShoppingCart(ShoppingCartProductDto shoppingCartProduct)
        {
            try
            {
                ShoppingCartProductDto _shoppingCartProduct = await _shoppingCartProductRepository.AddProductToShoppingCart(shoppingCartProduct);
                bool existsWishlist = await _wishlistProductRepository.UserHasProduct(shoppingCartProduct.UserId, shoppingCartProduct.ProductId);
                if (existsWishlist)
                {
                    WishlistProductDto _wishlistProduct = new WishlistProductDto { ProductId =  shoppingCartProduct.ProductId, UserId = shoppingCartProduct.UserId };
                    bool removedFromWishlist = await _wishlistProductRepository.DeleteProductFromWishlist(_wishlistProduct);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "Product added to Shopping Cart", Result = _shoppingCartProduct };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> RemoveProductVariantFromWishlist(ShoppingCartProductDto shoppingCartProduct)
        {
            try
            {
                bool productDeleted = await _shoppingCartProductRepository.DeleteProductFromShoppingCart(shoppingCartProduct);
                if (!productDeleted)
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "Either product or user doesn't exist please check the data inserted" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "Product removed from users Shopping Cart" };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpDelete]
        [Route("{userId}")]
        public async Task<IActionResult> ClearUserShoppingCart(string userId)
        {
            try
            {
                bool shoppingCartCleared = await _shoppingCartProductRepository.ClearUserShoppingCart(userId);
                if (!shoppingCartCleared)
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "Either product or user doesn't exist please check the data inserted" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "User " + userId + " Wishlist is cleared" };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
    }
}
