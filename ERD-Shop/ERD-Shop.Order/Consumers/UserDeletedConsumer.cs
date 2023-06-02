using ERD_Shop.Order.Models.DTOs;
using ERD_Shop.Order.Repository;
using MassTransit;
using User.Contracts;

namespace ERD_Shop.Order.Consumers
{
    public class UserDeletedConsumer : IConsumer<ApplicationUserDeleted>
    {
        private readonly IUserRepository _userRepository;
        public UserDeletedConsumer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Consume(ConsumeContext<ApplicationUserDeleted> context)
        {
            var message = context.Message;
            var item = await _userRepository.GetUserById(message.Id);
            if (item == null)
            {
                return;
            }
            await _userRepository.DeleteUser(message.Id);
        }
    }
}
