using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public class DiscountCodeRepository : IDiscountCodeRepository
    {
        private readonly OrdersContext _db;

        public DiscountCodeRepository(OrdersContext db)
        {
            db = _db;
        }

        public Task<DiscountCodeDto> CreateUpdateDiscountCode(DiscountCodeDto discountCodeDto)
        {
            var model = new ERD_Shop.Order.Models.DiscountCode();
            model.CodeValueId = discountCodeDto.CodeValueId;
            model.ExpirationDate = discountCodeDto.ExpirationDate;
            model.UsageLimit = discountCodeDto.UsageLimit;
            model.UserId = discountCodeDto.UserId;

            if (discountCodeDto.CodeValueId == 0)
            {
                // CREATE
                string discountCode = "abdef";
                Random test = new Random();

                for (int i = 0; i < 3; i++)
                {
                    discountCode += test.Next();
                }



                _db.DiscountCodes.Add(model);
                _db.SaveChanges();
            }
            else
            {
                _db.DiscountCodes.Update(model);
                _db.SaveChanges();
                // Edit
            }

            return Task.FromResult(discountCodeDto);

        }

        public Task<bool> DeleteDiscountCode(int discountCodeId)
        {
            var model = _db.DiscountCodes.FirstOrDefault(x => x.CodeValueId == discountCodeId);

            if (model != null)
            {
                _db.DiscountCodes.Remove(model);
                bool isRemoved = _db.SaveChanges() > 0;
                return Task.FromResult(isRemoved);
            }

            return Task.FromResult(false);
        }

        public Task<DiscountCodeDto> GetDiscountCodeId(int discountCodeId)
        {
            var discountCode = _db.DiscountCodes.FirstOrDefault(x => x.CodeValueId == discountCodeId);
            // Map the order entity to an OrderDto object

            var dto = new DiscountCodeDto()
            {
                CodeValueId = discountCode.CodeValueId,

            };
            // orderDto = _mapper.Map<OrderDto>(order);
            return Task.FromResult(dto);
        }

       public Task<IEnumerable<DiscountCodeDto>> GetDiscountCode()
        {
            var data = _db.DiscountCodes.ToList();

            var model = data.Select(x => new DiscountCodeDto
            {
                CodeValueId = x.CodeValueId,
                ExpirationDate = x.ExpirationDate,
                UsageLimit = x.UsageLimit,
                UserId = x.UserId
                

            }).AsEnumerable();

            return Task.FromResult(model);
        }
    }
}
