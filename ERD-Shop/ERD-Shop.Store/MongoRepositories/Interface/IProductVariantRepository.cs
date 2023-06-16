using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories.Interface
{
    public interface IProductVariantRepository
    {
        Task<ICollection<ProductVariantDto>> GetAllAsync();
        Task<ProductVariantDto> GetAsync(int id);
        Task<ProductVariantDto> CreateAsync(ProductVariantDto productVariant);
        Task<ProductVariantDto> UpdateAsync(ProductVariantDto productVariant);
        Task<ProductVariantDto> DeleteAsync(int id);
    }
}
