using AutoMapper;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;
using MassTransit.NewIdProviders;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace ERD_Shop.Order.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly OrdersContext _db;
        private readonly IMapper _mapper;
        public UserRepository(OrdersContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<UserDto> CreateUser(UserDto user)
        {
            Models.User userExists = await _db.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId);
            if (userExists != null)
            {
                return _mapper.Map<UserDto>(userExists);
            }
            Models.User _user = _mapper.Map<UserDto, Models.User>(user);
            _db.Add(_user);
            await _db.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUser(string id)
        {
            try
            {
                Models.User user = await _db.Users.FirstOrDefaultAsync(u => u.UserId == id);
                if(user == null)
                {
                    return false;
                }
                _db.Users.Remove(user);
                await _db.SaveChangesAsync();
                return true;
            }catch(Exception ex)
            {
                return false;
            }

        }

        public async Task<UserDto> GetUserById(string id)
        {
            Models.User _user = await _db.Users.Where(u => u.UserId == id).FirstOrDefaultAsync();
            return _mapper.Map<UserDto>(_user);
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            IEnumerable<Models.User> users = await _db.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            Models.User _user = _db.Users.FirstOrDefault(u => u.UserId == user.UserId);
            if(_user == null)
            {
                return _mapper.Map<UserDto>(_user);
            }
            _db.Update(_user);
            await _db.SaveChangesAsync();
            return user;
        }
    }
}
