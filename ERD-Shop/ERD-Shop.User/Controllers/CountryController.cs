using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/countries")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        protected ResponseDto _response;
        protected ICountryRepository _productRepository;

        public CountryController(ResponseDto response, ICountryRepository productRepository)
        {
            _response = response;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ResponseDto> Get()
        {
            try
            {
                IEnumerable<CountryDto> countryDtos = await _productRepository.GetCountries();
                _response.Result = countryDtos;
            } catch (Exception ex) {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ResponseDto> GetById(int id)
        {
            try
            {
                CountryDto countryDto = await _productRepository.GetCountryById(id);
                _response.Result = countryDto;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPost]
        public async Task<ResponseDto> Post([FromBody] CountryDto countryDto)
        {
            try
            {
                CountryDto country = await _productRepository.CreateUpdateCountry(countryDto);
                _response.Result = country;
            }catch(Exception ex)
            {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<ResponseDto> Put([FromBody] CountryDto countryDto)
        {
            try
            {
                CountryDto country = await _productRepository.CreateUpdateCountry(countryDto);
                _response.Result = country;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ResponseDto> Delete(int id)
        {
            try
            {
                bool isDeleted = await _productRepository.DeleteCountry(id);
                _response.Result = isDeleted;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
