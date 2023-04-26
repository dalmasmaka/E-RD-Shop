using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetProducts();
        Task<ProductDto> GetProductById(int ProductId);
        Task<ProductDto> CreateUpdateProduct(ProductDto productDto);
        Task<bool> DeleteProduct(int ProductId);
    }
}
