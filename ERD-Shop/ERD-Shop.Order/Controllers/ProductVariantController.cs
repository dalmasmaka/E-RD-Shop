using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/productvariants")]
    public class ProductVariantController : ControllerBase
    {

        protected ResponseDto _response;
        private IProductVariantRepository _productVariantRepository;


        public ProductVariantController(IProductVariantRepository productVariantRepository)
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
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<object> Get(int id)
        {
            try
            {
                ProductVariantDto productVariantDto = await _productVariantRepository.GetProductVariantId(id);
                _response.Result = productVariantDto;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object> Create(ProductVariantDto productVariantDto)
        {
            try
            {
                ProductVariantDto productVariantDtos = await _productVariantRepository.CreateUpdateProductVariant(productVariantDto);
                _response.Result = productVariantDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<object> Update(ProductVariantDto productVariantDto)
        {
            try
            {
                ProductVariantDto productVariantDtos = await _productVariantRepository.CreateUpdateProductVariant(productVariantDto);
                _response.Result = productVariantDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<object> DeleteProductVariant(int productVariantId)
        {
            try
            {
                bool isDeleted = await _productVariantRepository.DeleteProductVariant(productVariantId);
                _response.Result = isDeleted;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}