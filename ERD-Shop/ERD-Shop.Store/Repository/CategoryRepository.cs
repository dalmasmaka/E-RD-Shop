using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Store.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly StoreContext _context;
        private IMapper _mapper;
        public CategoryRepository(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CategoryDto> CreateUpdateCategory(CategoryDto categoryDto)
        {
            Category category = _mapper.Map<CategoryDto, Category>(categoryDto);
            if (category.CategoryId > 0)
            {
                _context.Categories.Update(category);
            }
            else
            {
                _context.Categories.Add(category);
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public async Task<bool> DeleteCategory(int CategoryId)
        {
            try
            {
                Category category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == CategoryId);
                if (category == null)
                {
                    return false;
                }
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<IEnumerable<CategoryDto>> GetCategories()
        {
            IEnumerable<Category> categoryList = await _context.Categories.ToListAsync();
            return _mapper.Map<List<CategoryDto>>(categoryList);
        }

        public async Task<CategoryDto> GetCategoryById(int CategoryId)
        {
            Category category = await _context.Categories.Where(x => x.CategoryId == CategoryId).FirstOrDefaultAsync();
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
