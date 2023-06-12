using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/[controller]")]
    public class DiscountCodeController : ControllerBase
    {
        protected ResponseDto _response;
        private IDiscountCodeRepository _discountCodeRepository;


        public DiscountCodeController(IDiscountCodeRepository discountCodeRepository)
        {
            _discountCodeRepository = discountCodeRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<DiscountCodeDto> discountCodeDtos = await _discountCodeRepository.GetDiscountCode();
                _response.Result = discountCodeDtos;

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
                DiscountCodeDto discountCodeDto = await _discountCodeRepository.GetDiscountCodeId(id);
                _response.Result = discountCodeDto;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object> Create(DiscountCodeDto discountCodeDto)
        {
            try
            {
                DiscountCodeDto discountCodeDtos = await _discountCodeRepository.CreateUpdateDiscountCode(discountCodeDto);
                _response.Result = discountCodeDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<object> Update(DiscountCodeDto discountCodeDto)
        {
            try
            {
                DiscountCodeDto discountCodeDtos = await _discountCodeRepository.CreateUpdateDiscountCode(discountCodeDto);
                _response.Result = discountCodeDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete("{id}")]
        public async Task<object> DeleteDiscountCode(int discountCodeId)
        {
            try
            {
                bool isDeleted = await _discountCodeRepository.DeleteDiscountCode(discountCodeId);
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