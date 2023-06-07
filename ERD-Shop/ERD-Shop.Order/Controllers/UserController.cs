using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MassTransit;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            ResponseDto _responseDto = new ResponseDto();
            IEnumerable<UserDto> users = await _userRepository.GetUsers();
            _responseDto.Result = users;
            if (users == null)
            {
                _responseDto.DisplayMessage = "There are no users in your database!";
                return StatusCode(StatusCodes.Status404NotFound, _responseDto);
            }
            return StatusCode(StatusCodes.Status200OK, _responseDto);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            ResponseDto _responseDto = new ResponseDto();
            try
            {
                UserDto user =await _userRepository.GetUserById(id);
                _responseDto.Result = user;
                return StatusCode(StatusCodes.Status200OK, _responseDto);
            }catch (Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            ResponseDto _responseDto = new ResponseDto();
            try {
                bool isDeleted = await _userRepository.DeleteUser(id);
                if (isDeleted)
                {
                    _responseDto.DisplayMessage = "User Deleted Successfully";
                    _responseDto.IsSuccess = true;
                    return StatusCode(StatusCodes.Status200OK, _responseDto);
                }
                _responseDto.IsSuccess = false;
                _responseDto.DisplayMessage = "Something went wrong!";
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }catch(Exception ex)
            {
                _responseDto.IsSuccess = false;
                _responseDto.ErrorMessages = new List<string>() { ex.ToString() };
                return StatusCode(StatusCodes.Status400BadRequest, _responseDto);
            }
        }
    }
}
