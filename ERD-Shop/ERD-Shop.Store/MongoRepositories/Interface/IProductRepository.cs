using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories.Interface
{
    public interface IProductRepository
    {
        Task<ICollection<ProductDto>> GetAllAsync();
        Task<ProductDto> GetByIdAsync(int id);
        Task<ICollection<ProductDto>> GetProductsByStore(int storeId);
        Task<ProductDto> CreateAsync(ProductDto productDto);
        Task<ProductDto> UpdateAsync(ProductDto productDto);
        Task<ProductDto> DeleteAsync(int id);
        Task<Dictionary<int, CategoryInfo>> Top10ProductsByCategory();
        Task<int> GetProductsCount();
    }
}