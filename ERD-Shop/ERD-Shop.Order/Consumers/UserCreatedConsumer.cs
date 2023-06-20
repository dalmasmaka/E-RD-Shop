using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using User.Contracts;

namespace ERD_Shop.Order.Consumers
{
    public class UserCreatedConsumer : IConsumer<ApplicationOrderUserCreated>
    {
        private readonly IUserRepository _userRepository;
        private readonly IDiscountCodeRepository _discountCodeRepository;
        public UserCreatedConsumer(IUserRepository userRepository, IDiscountCodeRepository discountCodeRepository)
        {
            _userRepository = userRepository;
            _discountCodeRepository = discountCodeRepository;
        }

        public async Task Consume(ConsumeContext<ApplicationOrderUserCreated> context)
        {
            var message = context.Message;
            var item = await _userRepository.GetUserById(message.Id);
            if (item != null) {
                return;
            }
            item = new UserDto
            {
                UserId = message.Id,
                FirstName = message.First_Name,
                LastName = message.Last_Name,
                Birthdate = message.BirthDate,
                CityId = message.City_Id,
                ZipCode = message.Zip_Code,
                Address = message.Address,
                Email = message.Email,
                Role = message.Role
            };
            UserDto user = await _userRepository.CreateUser(item);
            var discountCode = new DiscountCodeDto { CodeValueId = 0, ExpirationDate = DateTime.UtcNow.AddDays(30), UsageLimit = 1, UserId = user.UserId};
            await _discountCodeRepository.CreateUpdateDiscountCode(discountCode);
        }
    }
}
