using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantController : ControllerBase
    {
        private readonly IProductVariantRepository _productVariantRepository;
        private ResponseDto _response;
        public ProductVariantController(IProductVariantRepository productVariantRepository, ResponseDto response)
        {
            _productVariantRepository = productVariantRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductVariants()
        {
            try
            {
                IEnumerable<IProductVariantDto> products= await _productVariantRepository.GetProductVariants();
                if (!products.Any())
                {
                    _response = new ResponseDto { IsSuccess = true, Message = "There are no Products in your Database!", Result = products };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                _response = new ResponseDto { IsSuccess = true, Result = products };
                return StatusCode(StatusCodes.Status200OK, _response);
            }catch (Exception ex)
            {
                List<string> errors = new List<string>() { ex.ToString() };
                _response = new ResponseDto { IsSuccess = false, Message = "There's been 1 or more errors.", Errors = errors};
                return StatusCode(StatusCodes.Status400BadRequest, _response);
            }

        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProductVariantById(int id)
        {
            try
            {
                IProductVariantDto product = await _productVariantRepository.GetProductVariantById(id);
                if (product == null)
                {
                    _response = new ResponseDto { IsSuccess = true, Message = "The ProductVariant you're looking for does not exist!", Result = product };
                    return StatusCode(StatusCodes.Status404NotFound, _response);
                }
                _response = new ResponseDto { IsSuccess = true, Result = product };
                return StatusCode(StatusCodes.Status200OK, _response);
            }catch(Exception ex)
            {
                List<string> errors = new List<string>() { ex.ToString() };
                _response = new ResponseDto { IsSuccess = false, Message = "There's been 1 or more errors.", Errors = errors };
                return StatusCode(StatusCodes.Status400BadRequest, _response);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateProductVariant(IProductVariantDto product)
        {
            try
            {
                IProductVariantDto _product = await _productVariantRepository.CreateProductVariant(product);
                _response = new ResponseDto { IsSuccess = true, Message = "ProductVariant has been created!", Result = _product};
                return StatusCode(StatusCodes.Status200OK, _response);
            }catch(Exception ex)
            {
                List<string> errors = new List<string>() { ex.ToString() };
                _response = new ResponseDto { IsSuccess = false, Message = "There's been 1 or more errors.", Errors = errors };
                return StatusCode(StatusCodes.Status400BadRequest, _response);
            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProductVariant(IProductVariantDto product)
        {
            try
            {
                IProductVariantDto _product = await _productVariantRepository.UpdateProductVariant(product);
                _response = new ResponseDto { IsSuccess = true, Message = "PorductVariant has been upadated!", Result = _product };
                return StatusCode(StatusCodes.Status200OK, _response);
            }catch(Exception ex)
            {
                List<string> errors = new List<string>() { ex.ToString() };
                _response = new ResponseDto { IsSuccess = false, Message = "There's been 1 or more errors.", Errors = errors };
                return StatusCode(StatusCodes.Status400BadRequest, _response);
            }
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProductVariant(int id)
        {
            try
            {
                bool success = await _productVariantRepository.DeleteProductVariant(id);
                if (success)
                {
                    _response = new ResponseDto { IsSuccess = true, Message = "ProductVariant has been deleted!" };
                    return StatusCode(StatusCodes.Status200OK, _response);
                }
                _response = new ResponseDto { IsSuccess = false, Message = "ProductVariant with id:" + id + " Does not exist in your database!" };
                return StatusCode(StatusCodes.Status404NotFound, _response);
            }catch(Exception ex)
            {
                List<string> errors = new List<string>() { ex.ToString() };
                _response = new ResponseDto { IsSuccess = false, Message = "There's been 1 or more errors.", Errors = errors };
                return StatusCode(StatusCodes.Status400BadRequest, _response);
            }
        }
    }
}
