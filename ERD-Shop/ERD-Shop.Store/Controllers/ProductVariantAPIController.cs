using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    public class ProductVariantAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private IProductVariantRepository _productVariantRepository;

        public ProductVariantAPIController(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<ProductVariantDto> productVariantDtos = await _productVariantRepository.GetProductVariants();
                _response.Result = productVariantDtos;
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
                ProductVariantDto productVariantDto = await _productVariantRepository.GetProductVariantById(id);
                _response.Result = productVariantDto;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object> Post(ProductVariantDto productVariantDto)
        {
            try
            {
                ProductVariantDto model = await _productVariantRepository.CreateUpdateProductVariant(productVariantDto);
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
        public async Task<object> Put(ProductVariantDto productVariantDto)
        {
            try
            {
                ProductVariantDto model = await _productVariantRepository.CreateUpdateProductVariant(productVariantDto);
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
                bool isSuccess = await _productVariantRepository.DeleteProductVariant(id);
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
