using AutoMapper;
using ERD_Shop.Store.Data;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public class StoreRepository : IStoreRepository
    {
        private readonly IMongoDatabase _context;
        public StoreRepository(IOptions<Settings>options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _context = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Stores> storecollection => _context.GetCollection<Stores>("stores");

        public void Create(Stores stores)
        {
            storecollection.InsertOne(stores);
        }

        public void Delete(int id)
        {
            var filter = Builders<Stores>.Filter.Eq(c => c.StoreId, id);
            storecollection.DeleteOne(filter);
        }

        public Stores GetStoreById(int id)
        {
            var storebyid = storecollection.Find(m=>m.StoreId== id).FirstOrDefault();
            return storebyid;   
        }

        public IEnumerable<Stores> GetStores()
        {
            return storecollection.Find(a => true).ToList();
        }

        public void Update(int id, Stores stores)
        {
            var filter = Builders<Stores>.Filter.Eq(m => m.StoreId, id);
            var update = Builders<Stores>.Update
                .Set("StoreName", stores.StoreName)
                .Set("StoreLocation", stores.StoreLocation)
                .Set("StoreOwner", stores.StoreOwner)
                .Set("StoreImg", stores.StoreImg);
            storecollection.UpdateOne(filter, update);
        }
    }
}