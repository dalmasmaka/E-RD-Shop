using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetCategories();
        Task<CategoryDto> GetCategoryById(int CategoryId);
        Task<CategoryDto> CreateUpdateCategory(CategoryDto categoryDto);
        Task<bool> DeleteCategory(int CategoryId);

    }
}
