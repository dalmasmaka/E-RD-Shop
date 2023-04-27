using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    public class CategoryAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private ICategoryRepository _categoryRepository;
        public CategoryAPIController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<CategoryDto> categoryDtos = await _categoryRepository.GetCategories();
                _response.Result = categoryDtos;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };

            }
            return _response;
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<object> Get(int id)
        {
            try
            {
                CategoryDto categoryDto = await _categoryRepository.GetCategoryById(id);
                _response.Result = categoryDto;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object> Post(CategoryDto categoryDto)
        {
            try
            {
                CategoryDto model = await _categoryRepository.CreateUpdateCategory(categoryDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<object> Put(CategoryDto categoryDto)
        {
            try
            {
                CategoryDto model = await _categoryRepository.CreateUpdateCategory(categoryDto);
                _response.Result = model;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<object> Delete(int id)
        {
            try
            {
                bool isSuccess = await _categoryRepository.DeleteCategory(id);
                _response.Result = isSuccess;
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
