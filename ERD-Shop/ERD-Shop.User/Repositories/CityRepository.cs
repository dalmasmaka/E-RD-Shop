using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.User.Repositories
{
    public class CityRepository : ICityRepository
    {
        ApplicationDbContext _db;
        IMapper _mapper;
        public CityRepository(ApplicationDbContext db, IMapper mapper) {
            _db = db;
            _mapper = mapper;
        }
        public async Task<CityDto> CreateUpdateCity(CityDto city)
        {
            City _city = _mapper.Map<CityDto, City>(city);
            if (_city.City_Id > 0)
            {
                _db.Cities.Update(_city);
            }
            else
            {
                _db.Cities.Add(_city);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<City, CityDto>(_city);
        }

        public async Task<bool> DeleteCity(int city_id)
        {
            try
            {
                City city = await _db.Cities.FirstOrDefaultAsync(c => c.City_Id == city_id);
                if (city == null)
                {
                    return false;
                }
                _db.Cities.Remove(city);
                _db.SaveChanges();
                return true;
            } catch (Exception ex) {
                return false;
            }
        }

        public async Task<IEnumerable<CityDto>> GetCities()
        {
            IEnumerable<City> cityList = await _db.Cities.ToListAsync();
            return _mapper.Map<List<CityDto>>(cityList);
        }

        public async Task<CityDto> GetCityById(int city_id)
        {
            City city = await _db.Cities.Where(c => c.City_Id == city_id).FirstOrDefaultAsync();
            return _mapper.Map<CityDto>(city);
        }
    }
}
