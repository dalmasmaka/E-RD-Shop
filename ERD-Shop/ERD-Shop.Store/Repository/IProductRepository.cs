using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public interface IProductRepository
    {
        IMongoCollection<Product> productcollection { get; }
        IEnumerable<Product> GetProducts();
        Product GetProductById(int id);
        void Create(Product product);
        void Update(int id, Product product);
        void Delete(int id);
    }
}
