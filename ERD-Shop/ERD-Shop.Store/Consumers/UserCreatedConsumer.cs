using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories;
using MassTransit;
using User.Contracts;

namespace ERD_Shop.Store.Consumers
{
    public class UserCreatedConsumer : IConsumer<ApplicationStoreUserCreated>
    {
        private readonly IUserRepository _userRepository;
        public UserCreatedConsumer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Consume(ConsumeContext<ApplicationStoreUserCreated> context)
        {
            var message = context.Message;
            var item = await _userRepository.GetUserById(message.Id);
            if (item != null)
            {
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
            await _userRepository.CreateUser(item);
        }
    }
}
