using AutoMapper;
using ERD_Shop.Store.Data;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoDatabase _context;
        public ProductRepository(IOptions<Settings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _context = client.GetDatabase(options.Value.Database);
        }
        public IMongoCollection<Product> productcollection => throw new NotImplementedException();

        public void Create(Product product)
        {
            productcollection.InsertOne(product);
        }

        public void Delete(int id)
        {
            var filter = Builders<Product>.Filter.Eq(c=> c.ProductId, id);
            productcollection.DeleteOne(filter);
        }

        public Product GetProductById(int id)
        {
           
            var productbyid = productcollection.Find(m=>m.ProductId==id).FirstOrDefault();
            return productbyid;
        }

        public IEnumerable<Product> GetProducts()
        {
            return productcollection.Find(a=>true).ToList();
        }

        public void Update(int id, Product product)
        {
            var filter = Builders<Product>.Filter.Eq(c => c.ProductId, id);
            var update = Builders<Product>.Update
                .Set("ProductName", product.ProductName)
                .Set("ProductImg", product.ProductImg);
            productcollection.UpdateOne(filter, update);
        }
    }
}
