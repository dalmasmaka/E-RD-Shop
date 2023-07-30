//using ERD_Shop.Order.Models.DTOs;
//using ERD_Shop.Order.Repository;
//using Microsoft.AspNetCore.Mvc;

//namespace ERD_Shop.Order.Controllers
//{
//    [Route("api/payments")]
//    [ApiController]

//    public class PaymentController : ControllerBase
//    {
//        protected ResponseDto _response;
//        private readonly IPaymentRepository _paymentRepository;
//        public PaymentController(IPaymentRepository paymentRepository)
//        {
//            _response = new ResponseDto();
//            _paymentRepository = paymentRepository;
//        }
//        [HttpGet]
//        public async Task<object> GetPayments()
//        {
//            try
//            {
//                IEnumerable<PaymentDto> payments = await _paymentRepository.GetAllPayments();

//                if (!payments.Any())
//                {
//                    return NotFound("There are no order payments.");
//                }
//                return Ok(payments);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }
//        [HttpPost]
//        public async Task<object> Create(PaymentDto paymentDto)
//        {

//            try
//            {
//                PaymentDto payment = await _paymentRepository.CreatePayment(paymentDto);
//                _response.Result = payment;
//            }
//            catch (Exception ex)
//            {
//                _response.IsSuccess = false;
//                _response.ErrorMessages = new List<string>() { ex.ToString() };
//            }
//            return _response;
//        }

//    }
//}
