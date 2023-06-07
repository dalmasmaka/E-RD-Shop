using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.User.Controllers
{
    [Route("api/cities")]
    [ApiController]
    public class CityController : ControllerBase
    {
        protected ResponseDto _response;
        protected ICityRepository _cityRepository;
        public CityController(ResponseDto response, ICityRepository cityRepository)
        {
            this._response = response;
            this._cityRepository= cityRepository;
        }

        [HttpGet]
        public async Task<ResponseDto> Get()
        {
            try
            {
                IEnumerable<CityDto> countryDtos = await _cityRepository.GetCities();
                _response.Result = countryDtos;
            }
            catch (Exception ex)
            {
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
                CityDto countryDto = await _cityRepository.GetCityById(id);
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
        public async Task<ResponseDto> Post([FromBody] CityDto cityDto)
        {
            try
            {
                CityDto city = await _cityRepository.CreateUpdateCity(cityDto);
                _response.Result = city;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Errors = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        [HttpPut]
        public async Task<ResponseDto> Put([FromBody] CityDto cityDto)
        {
            try
            {
                CityDto city = await _cityRepository.CreateUpdateCity(cityDto);
                _response.Result = city;
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
                bool isDeleted = await _cityRepository.DeleteCity(id);
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
