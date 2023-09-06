using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        public IProductRepository _productRepository;
        public ResponseDto _response;
        public ProductController(IProductRepository productRepository, ResponseDto response)
        {
            _productRepository = productRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _productRepository.GetAllAsync();
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
        [HttpGet]
        [Route("Top10ProductsByCategory")]
        public async Task<ResponseDto> Top10ProductsByCategory()
        {
            try
            {
                var result = await _productRepository.Top10ProductsByCategory();
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
        [HttpGet]
        [Route("ProductsCount")]
        public async Task<ResponseDto> GetProductsCount()
        {
            try
            {
                var result = await _productRepository.GetProductsCount();
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
        public async Task<ResponseDto> GetAsync(int id)
        {
            try
            {
                var result = await _productRepository.GetByIdAsync(id);
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
        [HttpGet("StoreProducts/{storeId}")]
        public async Task<ResponseDto> GetStoreProducts(int storeId)
        {
            try
            {
                var result = await _productRepository.GetProductsByStore(storeId);
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
        public async Task<ResponseDto> CreateAsync([FromBody]ProductDto product)
        {
            try
            {
                var result = await _productRepository.CreateAsync(product);
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
        public async Task<ResponseDto> UpdateAsync(ProductDto product)
        {
            try
            {
                var result = await _productRepository.UpdateAsync(product);
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
        [HttpDelete("{id}")]
        public async Task<ResponseDto> DeleteAsync(int id)
        {
            try
            {
                var result = await _productRepository.DeleteAsync(id);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                if (ex.Message == "Product cannot be deleted because it has associated product variants.")
                {
                    _response.isSuccess = false;
                    _response.ErrorMessage = new List<string>() { "Product has associated variants and cannot be deleted." };
                }
                else
                {
                    _response.isSuccess = false;
                    _response.ErrorMessage = new List<string>() { "An error occurred while deleting the product." };
                }
            }
            return _response;
        }


    }
}
