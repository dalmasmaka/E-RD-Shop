using ERD_Shop.Store.Models;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public interface IStoreRepository
    {
        IMongoCollection<Stores> storecollection { get; }
        IEnumerable<Stores> GetStores();
        Stores GetStoreById(int id);
        void Create(Stores stores);
        void Update(int id, Stores stores);
        void Delete(int id);


    }
}
