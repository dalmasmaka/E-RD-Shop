using AutoMapper;
using ERD_Shop.Store.Data;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public class ProductVariantRepository : IProductVariantRepository
    {
        private readonly IMongoDatabase _context;
        public ProductVariantRepository(IOptions<Settings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _context = client.GetDatabase(options.Value.Database);
        }
        public IMongoCollection<ProductVariant> productVariantCollection => _context.GetCollection<ProductVariant>("productVariant");

        public void Create(ProductVariant productVariant)
        {
            productVariantCollection.InsertOne(productVariant);
        }

        public void Delete(int id)
        {
            var filter = Builders<ProductVariant>.Filter.Eq(c => c.ProductVariantId, id);
            productVariantCollection.DeleteOne(filter); 
        }

        public ProductVariant GetProductVariantById(int id)
        {
            var productVariantbyid= productVariantCollection.Find(m=>m.ProductVariantId==id).FirstOrDefault();
            return productVariantbyid;
        }

        public IEnumerable<ProductVariant> GetProductVariants()
        {
            return productVariantCollection.Find(a=>true).ToList();
        }

        public void Update(int id, ProductVariant productVariant)
        {
            var filter = Builders<ProductVariant>.Filter.Eq(c => c.ProductVariantId, id);
            var update = Builders<ProductVariant>.Update
                .Set("ProductVariantName", productVariant.ProductVariantName)
                .Set("SkuCode", productVariant.SkuCode)
                .Set("StockQuantity", productVariant.StockQuantity)
                .Set("ShortDescription", productVariant.ShortDescription)
                .Set("ProductVariantImg", productVariant.ProductVariantImg);
            productVariantCollection.UpdateMany(filter, update);
        }
    }
}
