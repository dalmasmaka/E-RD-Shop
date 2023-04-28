using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IProductVariantRepository
    {
        Task<IEnumerable<ProductVariantDto>> GetProductVariants();
        Task<ProductVariantDto> GetProductVariantId(int productVariantId);
        Task<ProductVariantDto> CreateUpdateProductVariant(ProductVariantDto productVariantDto);
        Task<bool> DeleteProductVariant(int productVariantId);
    }
}