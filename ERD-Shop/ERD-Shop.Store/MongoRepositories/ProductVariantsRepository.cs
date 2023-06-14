using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class ProductVariantsRepository : IProductVariantRepository
    {
        private const string collectionName = "ProductVariants";
        private readonly IMongoCollection<ProductVariant> dbCollection;
        private readonly FilterDefinitionBuilder<ProductVariant> filterBuilder = Builders<ProductVariant>.Filter;
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        public ProductVariantsRepository(IMapper mapper, IMongoDatabase database)
        {
            _database = database;
            _mapper = mapper;
            dbCollection = database.GetCollection<ProductVariant>(collectionName);
        }
        private static int GetNextSequenceValue(IMongoDatabase database, string collectionName)
        {
            var countersCollection = database.GetCollection<BsonDocument>("ProductVariantCounters");
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

        public async Task<ProductVariantDto> CreateAsync(ProductVariantDto productVariant)
        {
            if (productVariant == null)
            {
                throw new ArgumentNullException(nameof(productVariant));
            }
            int nextProductVariantId = GetNextSequenceValue(_database, collectionName);
            productVariant.ProductVariantId = nextProductVariantId;
            ProductVariant _productVariant = _mapper.Map<ProductVariantDto, ProductVariant>(productVariant);
            await dbCollection.InsertOneAsync(_productVariant);
            return productVariant;

        }

        public async Task<ProductVariantDto> DeleteAsync(int id)
        {
            FilterDefinition<ProductVariant> filter = filterBuilder.Eq(productVariant => productVariant.ProductVariantId, id);
            ProductVariant _productVariant = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
            return _mapper.Map<ProductVariantDto>(_productVariant);

        }

        public async Task<ICollection<ProductVariantDto>> GetAllAsync()
        {
            var productVariants = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return _mapper.Map<ICollection<ProductVariantDto>>(productVariants);
        }

        public async Task<ProductVariantDto> GetAsync(int id)
        {
            FilterDefinition<ProductVariant> filter = filterBuilder.Eq(productVariants => productVariants.ProductVariantId, id);
            ProductVariant productVariant = await dbCollection.Find(filter).FirstOrDefaultAsync();
            return _mapper.Map<ProductVariantDto>(productVariant);
        }

        public async Task<ProductVariantDto> UpdateAsync(ProductVariantDto productVariant)
        {
            if(productVariant == null)
            {
                throw new ArgumentNullException(nameof(productVariant));
            }
            FilterDefinition<ProductVariant> filter = filterBuilder.Eq(existingProductVariant => existingProductVariant.ProductVariantId, productVariant.ProductVariantId);
            ProductVariant _productVariant = await dbCollection.Find(filter).FirstOrDefaultAsync();

            UpdateDefinition<ProductVariant> update = Builders<ProductVariant>.Update
                .Set(existingProductVariant => existingProductVariant.ProductVariantName, productVariant.ProductVariantName)
                .Set(existingProductVariant => existingProductVariant.ProductVariantImg, productVariant.ProductVariantImg);
            await dbCollection.UpdateOneAsync(filter, update);
            return productVariant;
        }
    }
}
