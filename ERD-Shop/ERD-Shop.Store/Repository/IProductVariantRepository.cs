using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.Repository
{
    public interface IProductVariantRepository
    {
        IMongoCollection<ProductVariant> productVariantCollection { get;  }
        IEnumerable<ProductVariant> GetProductVariants();
        ProductVariant GetProductVariantById(int id);
        void Create(ProductVariant productVariant);
        void Update(int id, ProductVariant productVariant);
        void Delete(int id);

    }
}
