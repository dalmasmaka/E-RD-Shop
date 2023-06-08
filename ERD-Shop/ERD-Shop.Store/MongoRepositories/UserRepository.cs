using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class UserRepository : IUserRepository
    {
        private const string collectionName = "User";
        private readonly IMongoCollection<Models.User> dbCollection;
        private readonly FilterDefinitionBuilder<Models.User> filterBuilder = Builders<Models.User>.Filter;
        private readonly IMapper _mapper;
        public UserRepository(IMapper mapper, IMongoDatabase database)
        {
            _mapper = mapper;
            dbCollection = database.GetCollection<Models.User>(collectionName);
        }
        public async Task<UserDto> CreateUser(UserDto user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            Models.User _user = _mapper.Map<UserDto, Models.User>(user);
            await dbCollection.InsertOneAsync(_user);
            return user;
        }

        public async Task<UserDto> DeleteUser(string id)
        {
            FilterDefinition<Models.User> filter = filterBuilder.Eq(user => user.UserId, id);
            Models.User _user = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
            return _mapper.Map<UserDto>(_user);
        }

        public async Task<UserDto> GetUserById(string id)
        {
            FilterDefinition<Models.User> filter = filterBuilder.Eq(user => user.UserId, id);
            Models.User user = await dbCollection.Find(filter).FirstOrDefaultAsync();
            return _mapper.Map<UserDto>(user);
          
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var user = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return _mapper.Map<ICollection<UserDto>>(user);
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            FilterDefinition<Models.User> filter = filterBuilder.Eq(existingUser => existingUser.UserId, user.UserId);
            Models.User _user = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.ReplaceOneAsync(filter, _user);
            return user;
        }
    }
}
