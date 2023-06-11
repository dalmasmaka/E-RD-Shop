using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories
{
    public interface IProductRepository
    {
        Task<ICollection<ProductDto>> GetAllAsync();
        Task<ProductDto> GetByIdAsync(int id);
        Task<ProductDto>CreateAsync(ProductDto productDto);
        Task<ProductDto> UpdateAsync(ProductDto productDto);
        Task<ProductDto> DeleteAsync(int id);
    }
}
