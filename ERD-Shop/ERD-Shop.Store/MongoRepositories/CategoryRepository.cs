using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private const string collectionName = "Categories";
        private readonly IMongoCollection<Category> dbCollection;
        private readonly FilterDefinitionBuilder<Category> filterBuilder = Builders<Category>.Filter;
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        public CategoryRepository(IMapper mapper, IMongoDatabase database)
        {
            _database = database;
            dbCollection = database.GetCollection<Category>(collectionName);
            _mapper = mapper;
        }
        private static int GetNextSequenceValue(IMongoDatabase database, string collectionName)
        {
            var countersCollection = database.GetCollection<BsonDocument>("CategoryCounters");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", collectionName);
            var update = Builders<BsonDocument>.Update.Inc("seq", 1);
            var options = new FindOneAndUpdateOptions<BsonDocument>
            {
                ReturnDocument = ReturnDocument.After,
                IsUpsert = true
            };

            var result = countersCollection.FindOneAndUpdate(filter, update, options);
            return result["seq"].AsInt32;
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
            int nextCategoryId = GetNextSequenceValue(_database, collectionName);
            category.CategoryId = nextCategoryId;
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

            
            UpdateDefinition<Category> update = Builders<Category>.Update
                .Set(existingCategory => existingCategory.CategoryName, category.CategoryName)
                .Set(existingCategory => existingCategory.CategoryImg, category.CategoryImg);
                await dbCollection.UpdateOneAsync(filter, update);

            return category;
        }
        public  async Task<CategoryDto> DeleteAsync(int id)
        {
            FilterDefinition<Category> filter = filterBuilder.Eq(category => category.CategoryId, id);
            Category category = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<int> GetCategoriesCount()
        {
            var count = await dbCollection.CountDocumentsAsync(_ => true);
            return (int)count;
        }
        public async Task<Category> GetCategoryName(int categoryId)
        {
            // Retrieve the category with the specified ID from the database
            var category = await dbCollection.Find(c => c.CategoryId == categoryId).FirstOrDefaultAsync();
            return category;
        }
    }
}
