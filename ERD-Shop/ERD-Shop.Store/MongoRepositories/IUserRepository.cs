using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.MongoRepositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetUsers();
        Task<UserDto> GetUserById(string id);
        Task<UserDto> CreateUser(UserDto user);
        Task<UserDto> UpdateUser(UserDto user);
        Task<UserDto> DeleteUser(string id);
    }
}
