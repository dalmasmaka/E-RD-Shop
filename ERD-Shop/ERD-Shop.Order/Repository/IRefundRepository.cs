using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IRefundRepository
    {
        Task<IEnumerable<RefundDto>> GetRefund();
        Task<RefundDto> GetRefundById(int refundId);
        Task<RefundDto> CreateUpdateRefund(RefundDto refundDto);
        Task<bool> DeleteRefund(int refundId);
    }
}
