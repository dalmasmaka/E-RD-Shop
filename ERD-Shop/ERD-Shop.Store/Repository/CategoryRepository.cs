using AutoMapper;
using ERD_Shop.Store.Data;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IMongoDatabase _context;
       
        public CategoryRepository(IOptions<Settings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _context = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<Category> categorycollection => _context.GetCollection<Category>("category");

        public void Create(Category category)
        {
            categorycollection.InsertOne(category);
        }

        public void Delete(int id)
        {
            var filter = Builders<Category>.Filter.Eq(c => c.CategoryId, id);
            categorycollection.DeleteOne(filter);
        }

        public IEnumerable<Category> GetCategories()
        {
           
            return categorycollection.Find(a=>true).ToList();
        }

        public Category GetCategoryById(int id)
        {
            var categorybyid = categorycollection.Find(m=>m.CategoryId== id).FirstOrDefault();
            return categorybyid;
        }

        public void Update(int id, Category category)
        {
            var filter = Builders<Category>.Filter.Eq(c => c.CategoryId, id);
            var update = Builders<Category>.Update
                .Set("CategoryName", category.CategoryName)
                .Set("CategoryImg", category.CategoryImg);
            categorycollection.UpdateOne(filter, update);   
        }


    }
}
