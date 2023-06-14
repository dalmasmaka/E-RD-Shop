using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class StoreRepository : IStoreRepository
    {
        private const string collectionName = "Stores";
        private readonly IMongoCollection<Stores> dbCollection;
        private readonly FilterDefinitionBuilder<Stores>   filterBuilder = Builders<Stores>.Filter;
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        public StoreRepository(IMapper mapper, IMongoDatabase database)
        {
            _database=database;
            _mapper = mapper;
            dbCollection = database.GetCollection<Stores>(collectionName);
        }
        private static int GetNextSequenceValue(IMongoDatabase database, string collectionName)
        {
            var countersCollection = database.GetCollection<BsonDocument>("StoreCounters");
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


        public async Task<StoreDto> CreateAsync(StoreDto store)
        {
            if (store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }

            int nextStoreId = GetNextSequenceValue(_database, collectionName);
            store.StoreId = nextStoreId;

            Stores _store = _mapper.Map<StoreDto, Stores>(store);
            await dbCollection.InsertOneAsync(_store);
            return store;
        }


        public async Task<StoreDto> DeleteAsync(int id)
        {
            FilterDefinition<Stores> filter = Builders<Stores>.Filter.Eq(store => store.StoreId, id);
            Stores _stores = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.FindOneAndDeleteAsync(filter);
            return _mapper.Map<StoreDto>(_stores);
        }

        public async Task<ICollection<StoreDto>> GetAllAsync()
        {
            var stores = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return _mapper.Map<ICollection<StoreDto>>(stores);
        }

        public async Task<StoreDto> GetAsync(int id)
        {
            FilterDefinition<Stores> filter = filterBuilder.Eq(c => c.StoreId, id);
            Stores stores = await dbCollection.Find(filter).FirstOrDefaultAsync();
            return _mapper.Map<StoreDto>(stores);
        }

        public async Task<StoreDto> UpdateAsync(StoreDto store)
        {
            if (store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }

            FilterDefinition<Stores> filter = filterBuilder.Eq(existingStore => existingStore.StoreId, store.StoreId);
            Stores _stores = await dbCollection.Find(filter).FirstOrDefaultAsync();

            UpdateDefinition<Stores> update = Builders<Stores>.Update
                
                .Set(existingStore => existingStore.StoreName, store.StoreName)
                .Set(existingStore => existingStore.StoreOwner, store.StoreOwner)
                .Set(existingStore => existingStore.StoreLocation, store.StoreLocation)
                .Set(existingStore => existingStore.StoreContact, store.StoreContact)
                .Set(existingStore => existingStore.StoreImg, store.StoreImg); ;

            await dbCollection.UpdateOneAsync(filter, update);

            return store;
    }
    }
}
