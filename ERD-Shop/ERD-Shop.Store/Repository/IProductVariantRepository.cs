using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.Repository
{
    public interface IProductVariantRepository
    {
        Task<IEnumerable<ProductVariantDto>> GetProductVariants();
        Task<ProductVariantDto> GetProductVariantById(int ProductVariantId);
        Task<ProductVariantDto> CreateUpdateProductVariant(ProductVariantDto productVariantDto);
        Task<bool>DeleteProductVariant(int ProductVariantId);

    }
}
