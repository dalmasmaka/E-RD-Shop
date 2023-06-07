using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private ResponseDto _responseDto;
        private IWishlistRepository _wishlistRepository;
        public WishlistController(ResponseDto responseDto, IWishlistRepository wishlistRepository)
        {
            _responseDto = responseDto;
            _wishlistRepository = wishlistRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetWishlists()
        {
            IEnumerable<WishlistDto> wishlists = await _wishlistRepository.GetWishlists();
            if (!wishlists.Any())
            {
                _responseDto = new ResponseDto { IsSuccess = false, Message = "There are no wishlists in your database! Please check first if there are any users, then troubleshoot accordingly :)"};
                return StatusCode(StatusCodes.Status404NotFound, _responseDto);
            }
            _responseDto = new ResponseDto { IsSuccess = true, Message = "OK", Result = wishlists };
            return StatusCode(StatusCodes.Status200OK, _responseDto);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWishlistByUser(string id)
        {
            WishlistDto wishlist = await _wishlistRepository.GetWishlistByUser(id);
            if(wishlist == null)
            {
                _responseDto = new ResponseDto { IsSuccess = false, Message = "Wishlist by user with the id " + id + " does not exist. Please recheck the Id given!" };
                return StatusCode(StatusCodes.Status404NotFound, _responseDto);
            }
            _responseDto = new ResponseDto { Message = "OK", Result = wishlist };
            return StatusCode(StatusCodes.Status200OK, _responseDto);
        }
        [HttpPost]
        public async Task<IActionResult> CreateWishlist(WishlistDto wishlist)
        {
            try
            {
                await _wishlistRepository.CreateWishlist(wishlist);
                _responseDto.Result = wishlist;
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }catch(Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Errors = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
    }
}
