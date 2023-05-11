using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public interface ICategoryRepository
    {
        IMongoCollection<Category> categorycollection { get; }
        IEnumerable<Category> GetCategories();
        Category GetCategoryById(int id);
        void Create (Category category);
        void Update (int id, Category category);
        void Delete (int id);

    }
}
