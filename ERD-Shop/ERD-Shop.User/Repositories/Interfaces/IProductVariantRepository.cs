using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface IProductVariantRepository
    {
        public Task<IEnumerable<IProductVariantDto>> GetProductVariants();
        public Task<IProductVariantDto> GetProductVariantById(int id);
        public Task<IProductVariantDto> CreateProductVariant(IProductVariantDto productVariant);
        public Task<IProductVariantDto> UpdateProductVariant(IProductVariantDto productVariant);
        public Task<bool> DeleteProductVariant(int id);
    }
}
