using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistManagementController : ControllerBase
    {
        private readonly IWishlistProductRepository _productWishlistRepository;
        private readonly IShoppingCartProductRepository _shoppingCartProductRepository;
        private ResponseDto _responseDto;
        public WishlistManagementController(IWishlistProductRepository productWishlistRepository, ResponseDto response, IShoppingCartProductRepository shoppingCartProductRepository)
        {
            _productWishlistRepository = productWishlistRepository;
            _responseDto = response;
            _shoppingCartProductRepository = shoppingCartProductRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWishlistProducts()
        {
            try
            {
                IEnumerable<IProductVariantDto> wishlistProducts = await _productWishlistRepository.GetAllWishlistProducts();
                if (!wishlistProducts.Any())
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "There are no products in the wishlist" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = wishlistProducts, Message = "Here are all of the wishlist products from every user"};
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
        public async Task<IActionResult> GetUserWishlistProducts(string id)
        {
            try
            {
                IEnumerable<IProductVariantDto> wishlistProducts = await _productWishlistRepository.GetUserWishlistProducts(id);
                if (!wishlistProducts.Any())
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "There are no products in the wishlist" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Result = wishlistProducts, Message = "Here are all the products in the wishlist of user: " + id };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            } catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddProductVariantToWishlist(WishlistProductDto wishlistProduct)
        {
            try
            {
                WishlistProductDto _wishlistProduct = await _productWishlistRepository.AddProductToWishlist(wishlistProduct);
                bool existsShoppingCart = await _shoppingCartProductRepository.UserHasProduct(wishlistProduct.UserId, wishlistProduct.ProductId);
                if (existsShoppingCart)
                {
                    ShoppingCartProductDto product = new ShoppingCartProductDto { ProductId = wishlistProduct.ProductId, UserId = wishlistProduct.UserId };
                    bool removedFromShoppingCart = await _shoppingCartProductRepository.DeleteProductFromShoppingCart(product);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "Product added to Wishlist", Result = wishlistProduct };
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            } catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpDelete]
        public async Task<IActionResult> RemoveProductVariantFromWishlist(WishlistProductDto wishlistProduct)
        {
            try
            {
                bool productDeleted = await _productWishlistRepository.DeleteProductFromWishlist(wishlistProduct);
                if (!productDeleted)
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "Either product or user doesn't exist please check the data inserted" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "Product removed from users wishlist"};
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }
            catch (Exception ex) {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
        [HttpDelete]
        [Route("{userId}")]
        public async Task<IActionResult> ClearUserWishlist(string userId)
        {
            try
            {
                bool wishlistCleared = await _productWishlistRepository.ClearUserWishlist(userId);
                if (!wishlistCleared)
                {
                    _responseDto = new ResponseDto { IsSuccess = true, Message = "Either product or user doesn't exist please check the data inserted" };
                    return StatusCode(StatusCodes.Status404NotFound, _responseDto);
                }
                _responseDto = new ResponseDto { IsSuccess = true, Message = "User "+userId+" Wishlist is cleared" };
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
