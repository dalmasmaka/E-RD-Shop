using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private const string collectionName = "Categories";
        private readonly IMongoCollection<Category> dbCollection;
        private readonly FilterDefinitionBuilder<Category> filterBuilder = Builders<Category>.Filter;
        private readonly IMapper _mapper;
        public CategoryRepository(IMapper mapper, IMongoDatabase database)
        {   
            dbCollection = database.GetCollection<Category>(collectionName);
            _mapper = mapper;
        }

        public async Task<ICollection<CategoryDto>> GetAllAsync()
        {
            var categories = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return _mapper.Map<ICollection<CategoryDto>>(categories);
        }
        public async Task<CategoryDto> GetAsync(int id)
        {
            FilterDefinition<Category> filter = filterBuilder.Eq(c => c.CategoryId, id);
            Category category = await dbCollection.Find(filter).FirstOrDefaultAsync();
            return _mapper.Map<CategoryDto>(category);
        }
        public async Task<CategoryDto> CreateAsync(CategoryDto category)
        {
            if(category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }
            Category _category = _mapper.Map<CategoryDto, Category>(category);
            await dbCollection.InsertOneAsync(_category);
            return category;
        }
        public  async Task<CategoryDto> UpdateAsync(CategoryDto category)
        {
            if(category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }
            FilterDefinition<Category> filter = filterBuilder.Eq(existingCategory => existingCategory.CategoryId, category.CategoryId);
            Category _category = await dbCollection.Find(filter).FirstOrDefaultAsync();
            _category.CategoryName = category.CategoryName;
            _category.CategoryImg = category.CategoryImg;
            await dbCollection.ReplaceOneAsync(filter, _category);
            return category;
        }
        public  async Task<CategoryDto> DeleteAsync(int id)
        {
            FilterDefinition<Category> filter = filterBuilder.Eq(category => category.CategoryId, id);
            Category category = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
            return _mapper.Map<CategoryDto>(category);
        }
    }
}
