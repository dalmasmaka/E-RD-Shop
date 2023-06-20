using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Order.Repository
{
    public class DiscountCodeRepository : IDiscountCodeRepository
    {
        private readonly OrdersContext _db;

        public DiscountCodeRepository(OrdersContext db)
        {
            _db = db;
        }

        public async Task<DiscountCodeDto> CreateUpdateDiscountCode(DiscountCodeDto discountCodeDto)
        {
            var model = new ERD_Shop.Order.Models.DiscountCode();
            model.CodeValueId = discountCodeDto.CodeValueId;
            model.ExpirationDate = discountCodeDto.ExpirationDate;
            model.UsageLimit = discountCodeDto.UsageLimit;
            model.UserId = discountCodeDto.UserId;

            if (discountCodeDto.CodeValueId == 0 || discountCodeDto.CodeValueId == null)
            {
                // CREATE
                model.CodeValueId = await GenerateDiscountCode();

                _db.DiscountCodes.Add(model);
                await _db.SaveChangesAsync();
            }
            else
            {
                // UPDATE
                _db.DiscountCodes.Update(model);
                await _db.SaveChangesAsync();
            }
            return discountCodeDto;
        }

        public async Task<int> UseDiscountCode(int codeValueId)
        {
            DiscountCode _discountCode = await _db.DiscountCodes.Where(c => c.CodeValueId == codeValueId).FirstOrDefaultAsync();
            _discountCode.UsageLimit -= 1;
            await _db.SaveChangesAsync();
            return _discountCode.CodeValueId;
        }
        public async Task<int> GenerateDiscountCode()
        {
            Random rnd = new Random();
            int codeId = rnd.Next(100000,999999);
            DiscountCode codeExists = await _db.DiscountCodes.Where(d => d.CodeValueId == codeId).FirstOrDefaultAsync();
            if(codeExists != null)
            {
                await GenerateDiscountCode();
            }
            return codeId;
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
                UsageLimit = x.UsageLimit


            }).AsEnumerable();

            return Task.FromResult(model);
        }
    }
}