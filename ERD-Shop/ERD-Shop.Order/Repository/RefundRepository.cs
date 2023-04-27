using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public class RefundRepository : IRefundRepository
    {

        private readonly OrdersContext _db;

        public Task<RefundDto> CreateUpdateRefund(RefundDto refundDto)
        {
            var model = new ERD_Shop.Order.Models.Refund();
            model.RefundId = refundDto.RefundId;
            model.RefundDate = refundDto.RefundDate;
            model.RefundStatus = refundDto.RefundStatus;
            model.OrderId = refundDto.OrderId;
            model.UserId = refundDto.UserId;

            if (refundDto.RefundId == 0)
            {
                // CREATE



                _db.Refunds.Add(model);
                _db.SaveChanges();
            }
            else
            {
                _db.Refunds.Update(model);
                _db.SaveChanges();
                // Edit
            }

            return Task.FromResult(refundDto);
        }

        public Task<bool> DeleteRefund(int refundId)
        {
            var model = _db.Refunds.FirstOrDefault(x => x.RefundId == refundId);

            if (model != null)
            {
                _db.Refunds.Remove(model);
                bool isRemoved = _db.SaveChanges() > 0;
                return Task.FromResult(isRemoved);
            }

            return Task.FromResult(false);
        }

        public Task<IEnumerable<RefundDto>> GetRefund()
        {
            var data = _db.Refunds.ToList();

            var model = data.Select(x => new RefundDto
            {
                RefundId = x.RefundId,
                RefundDate = x.RefundDate,
                RefundStatus = x.RefundStatus,
                OrderId = x.OrderId,
                UserId = x.UserId

            }).AsEnumerable();

            return Task.FromResult(model);
        }

        public Task<RefundDto> GetRefundById(int refundId)
        {
            var refund = _db.Refunds.FirstOrDefault(x => x.RefundId == refundId);
            // Map the order entity to an Refund object

            var dto = new RefundDto()
            {
                RefundId = refund.RefundId,

            };
            // refunderDto = _mapper.Map<Refund>(refund);
            return Task.FromResult(dto);
        }
    }
}
