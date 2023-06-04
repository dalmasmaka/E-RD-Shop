using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class StoreRepository : IStoreRepository
    {
        private const string collectionName = "Stores";
        private readonly IMongoCollection<Stores> dbCollection;
        private readonly FilterDefinitionBuilder<Stores>   filterBuilder = Builders<Stores>.Filter;
        private readonly IMapper _mapper;
        public StoreRepository(IMapper mapper, IMongoDatabase database)
        {
            _mapper = mapper;
            dbCollection = database.GetCollection<Stores>(collectionName);
        }
        public async Task<StoreDto> CreateAsync(StoreDto store)
        {
            if(store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }
            Stores _store = _mapper.Map<StoreDto, Stores>(store);
            await dbCollection.InsertOneAsync(_store);
            return store;

        }

        public async Task<StoreDto> DeleteAsync(int id)
        {
            FilterDefinition<Stores> filter = filterBuilder.Eq(stores => stores.StoreId ,id);
            Stores _stores = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
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
            if(store == null)
            {
                throw new ArgumentNullException(nameof(store));
            }
            FilterDefinition<Stores> filter = filterBuilder.Eq(existingStore => existingStore.StoreId, store.StoreId);
            Stores _stores = await dbCollection.Find(filter).FirstOrDefaultAsync();
            _stores.StoreName = store.StoreName;
            _stores.StoreOwner = store.StoreOwner;
            _stores.StoreLocation = store.StoreLocation;
            await dbCollection.ReplaceOneAsync(filter, _stores);
            return store;
        }
    }
}
