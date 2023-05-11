using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/stores")]
    public class StoreAPIController : ControllerBase
    {
        private IStoreRepository _storeRepository;
        public StoreAPIController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Stores> GetStoreById(int id)
        {
            var store = _storeRepository.GetStoreById(id);
            if (store == null)
            {
                return NotFound();
            }
            return store;

        }
        [HttpPost]
        public ActionResult<Stores> Post(Stores store)
        {
            _storeRepository.Create(store);
            return CreatedAtAction(nameof(GetStoreById), new { id = store.StoreId }, store);
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, Stores stores)
        {
            var existingStore = _storeRepository.GetStoreById(id);

            if (existingStore == null)
            {
                return NotFound();
            }
            _storeRepository.Update(id, stores);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var store = _storeRepository.GetStoreById(id);
            if (store == null)
            {
                return NotFound();
            }
            _storeRepository.Delete(store.StoreId);
            return Ok();
        }

    }
}
