using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        protected ResponseDto _response;
        protected ICountryRepository _countryRepository;

        public CountryController(ResponseDto response, ICountryRepository countryRepository)
        {
            _response = response;
            _countryRepository = countryRepository;
        }

        [HttpGet]
        public async Task<ResponseDto> Get()
        {
            try
            {
                IEnumerable<CountryDto> countryDtos = await _countryRepository.GetCountries();
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
                CountryDto countryDto = await _countryRepository.GetCountryById(id);
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
                CountryDto country = await _countryRepository.CreateUpdateCountry(countryDto);
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
                CountryDto country = await _countryRepository.CreateUpdateCountry(countryDto);
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
                bool isDeleted = await _countryRepository.DeleteCountry(id);
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
