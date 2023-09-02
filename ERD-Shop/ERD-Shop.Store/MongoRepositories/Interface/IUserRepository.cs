using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetUsers();
        Task<UserDto> GetUserById(string id);
        Task<IEnumerable<UserDto>> StoreKeepers();
        Task<UserDto> LoggedStoreKeeper(UserDto user);
        Task<UserDto> CreateUser(UserDto user);
        Task<UserDto> UpdateUser(UserDto user);
        Task<UserDto> DeleteUser(string id);
    }
}
