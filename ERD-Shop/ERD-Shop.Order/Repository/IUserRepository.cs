using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetUsers();
        Task<UserDto> GetUserById(string id);
        Task<UserDto> CreateUser(UserDto user);
        Task<UserDto> UpdateUser(UserDto user);
        Task<bool> DeleteUser(string id); 
    }
}
