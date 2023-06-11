using ERD_Shop.Store.MongoRepositories;
using MassTransit;
using User.Contracts;

namespace ERD_Shop.Store.Consumers
{
    public class UserDeletedConsumer : IConsumer<ApplicationStoreUserDeleted>
    {
        private readonly IUserRepository _userRepository;
        public UserDeletedConsumer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Consume(ConsumeContext<ApplicationStoreUserDeleted> context)
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
