using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Order.Controllers
{
    [Route("api/refunds")]
    public class RefundController : ControllerBase
    {
        protected ResponseDto _response;
        private IRefundRepository _refundRepository;


        public RefundController(IRefundRepository refundRepository)
        {
            _refundRepository = refundRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<RefundDto> refundDtos = await _refundRepository.GetRefund();
                _response.Result = _refundRepository;

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
                RefundDto refundDtos = await _refundRepository.GetRefundById(id);
                _response.Result = refundDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object> CreateUpdate(RefundDto refundDto)
        {
            try
            {
            
                RefundDto refundDtos = await _refundRepository.CreateUpdateRefund(refundDto);
                _response.Result = refundDtos;

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<object> DeleteRefund(int refundId)
        {
            try
            {
                bool isDeleted = await _refundRepository.DeleteRefund(refundId);
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
