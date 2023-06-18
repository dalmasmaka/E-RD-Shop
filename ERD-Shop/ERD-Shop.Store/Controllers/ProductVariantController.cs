using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;
using Store.Contracts;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {

        public IProductVariantRepository _productVariantRepository;
        private readonly IPublishEndpoint _publishEndpoint;
        public ResponseDto _response;
        public ProductVariantController(IProductVariantRepository productVariantRepository, IPublishEndpoint publishEndpoint, ResponseDto response)
        {
            _productVariantRepository = productVariantRepository;
            _publishEndpoint = publishEndpoint;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _productVariantRepository.GetAllAsync();
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
                var result = await _productVariantRepository.GetAsync(id);
                
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
        public async Task<ResponseDto> CreateAsync([FromBody]ProductVariantDto productVariant)
        {
            try
            {
                var result = await _productVariantRepository.CreateAsync(productVariant);
                _publishEndpoint.Publish(new UserProductVariantCreated(result.ProductVariantId, result.ProductVariantName, result.Price));
                _publishEndpoint.Publish(new OrderProductVariantCreated(result.ProductVariantId, result.ProductVariantName, result.Price));
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
        public async Task<ResponseDto> UpdateAsync(ProductVariantDto productVariant)
        {
            try
            {
                var result = await _productVariantRepository.UpdateAsync(productVariant);
                _publishEndpoint.Publish(new UserProductVariantUpdated(productVariant.ProductVariantId, productVariant.ProductVariantName, result.Price));
                _publishEndpoint.Publish(new OrderProductVariantUpdated(productVariant.ProductVariantId, result.ProductVariantName, productVariant.Price));
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
                var result = await _productVariantRepository.DeleteAsync(id);
                _publishEndpoint.Publish(new OrderProductVariantDeleted(id));
                _publishEndpoint.Publish(new UserProductVariantDeleted(id));
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
