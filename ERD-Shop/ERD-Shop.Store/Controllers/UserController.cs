using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public IUserRepository _userRepository;
        public ResponseDto _response;
        public UserController(IUserRepository userRepository, ResponseDto response)
        {
            _userRepository = userRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _userRepository.GetUsers();
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpGet("{id}")]
        public async Task<ResponseDto> GetAsync(string id)
        {
            try
            {
                var result = await _userRepository.GetUserById(id);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<ResponseDto> CreateAsync(UserDto user)
        {
            try
            {
                var result = await _userRepository.CreateUser(user);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<ResponseDto> UpdateAsync(UserDto user)
        {
            try
            {
                var result = await _userRepository.CreateUser(user);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<ResponseDto> DeleteAsync(string id)
        {
            try
            {
                var result = await _userRepository.DeleteUser(id);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
