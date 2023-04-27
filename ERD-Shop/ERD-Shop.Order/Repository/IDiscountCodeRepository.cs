using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IDiscountCodeRepository
    {
        Task<IEnumerable<DiscountCodeDto>> GetDiscountCode();
        Task<DiscountCodeDto> GetDiscountCodeId(int discountCodeId);
        Task<DiscountCodeDto> CreateUpdateDiscountCode(DiscountCodeDto discountCodeDto);
        Task<bool> DeleteDiscountCode(int discountCodeId);
    }
}
