using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/stores")]
    public class StoreAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private IStoreRepository _storeRepository;
        public StoreAPIController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        public async Task<object> Get()
        {
            try
            {
                IEnumerable<StoreDto> storeDtos = await _storeRepository.GetStores();
                _response.Result = storeDtos;
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
        public async Task<object>Get(int id)
        {
            try
            {
                StoreDto storeDto = await _storeRepository.GetStoreById(id);
                _response.Result = storeDto;
            }catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<object>Post(StoreDto storeDto)
        {
            try
            {
                StoreDto model = await _storeRepository.CreateUpdateStore(storeDto);
                _response.Result = model;
            }
            catch(Exception ex) {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<object> Put(StoreDto storeDto)
        {
            try
            {
                StoreDto model = await _storeRepository.CreateUpdateStore(storeDto);
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
                bool isSuccess = await _storeRepository.DeleteStore(id);
                _response.Result=isSuccess;
            }
            catch(Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}
