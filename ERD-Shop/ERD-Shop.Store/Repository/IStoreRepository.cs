using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.Repository
{
    public interface IStoreRepository
    {
        Task<IEnumerable<StoreDto>> GetStores();
        Task<StoreDto> GetStoreById(int StoreId);
        Task<StoreDto> CreateUpdateStore(StoreDto storeDto);
        Task<bool>DeleteStore(int StoreId);
    }
}
