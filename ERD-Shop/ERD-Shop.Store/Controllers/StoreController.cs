using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {

        public IStoreRepository _storeRepository;
        public ResponseDto _response;
        public StoreController(IStoreRepository storeRepository, ResponseDto response)
        {
            _storeRepository = storeRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _storeRepository.GetAllAsync();
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
                var result = await _storeRepository.GetAsync(id);
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
        public async Task<ResponseDto> CreateAsync([FromBody]StoreDto store)
        {
            try
            {
                var result = await _storeRepository.CreateAsync(store);
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
        public async Task<ResponseDto> UpdateAsync([FromBody]StoreDto store)
        {
            try
            {
                var result = await _storeRepository.UpdateAsync(store);
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
                var result = await _storeRepository.DeleteAsync(id);
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
    