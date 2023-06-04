using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories
{
    public interface IStoreRepository
    {
        Task<ICollection<StoreDto>> GetAllAsync();
        Task<StoreDto> GetAsync(int id);
        Task<StoreDto> CreateAsync(StoreDto store);
        Task<StoreDto> UpdateAsync(StoreDto store);
        Task<StoreDto> DeleteAsync(int id);
    }
}
