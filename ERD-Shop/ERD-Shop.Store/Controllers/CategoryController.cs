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
    public class CategoryController : ControllerBase
    {
        public ICategoryRepository _categoryRepository;
        public ResponseDto _response;
        public CategoryController(ICategoryRepository categoryRepository, ResponseDto response)
        {
            _categoryRepository = categoryRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _categoryRepository.GetAllAsync();
                _response.isSuccess = true;
                _response.Result = result;
            }catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpGet("{id}")]
        public async Task<ResponseDto> GetAsync(int id) {
            try
            {
                var result = await _categoryRepository.GetAsync(id);
                _response.isSuccess = true;
                _response.Result = result;
            }catch(Exception ex) {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<ResponseDto> CreateAsync([FromBody]CategoryDto category)
        {
            try
            {
                var result = await _categoryRepository.CreateAsync(category);
                _response.isSuccess = true;
                _response.Result = result;
            }catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<ResponseDto> UpdateAsync(CategoryDto category)
        {
            try
            {
                var result = await _categoryRepository.UpdateAsync(category);
                _response.isSuccess = true;
                _response.Result = result;
            }catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete("{id}")]
        public async Task<ResponseDto> DeleteAsync(int id)
        {
            try
            {
                var result = await _categoryRepository.DeleteAsync(id);
                _response.isSuccess = true;
                _response.Result = result;
            }catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
