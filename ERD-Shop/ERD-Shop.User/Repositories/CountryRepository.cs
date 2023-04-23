using AutoMapper;
using ERD_Shop.User.DbContexts;
using ERD_Shop.User.Models;
using ERD_Shop.User.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ERD_Shop.User.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public CountryRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<CountryDto> CreateUpdateCountry(CountryDto country)
        {
            Country _country = _mapper.Map<CountryDto, Country>(country);
            if(_country.Country_Id > 0 )
            {
                _db.Countries.Update(_country);
            }
            else
            {
                _db.Countries.Add(_country);
            }
            await _db.SaveChangesAsync();
            return _mapper.Map<Country, CountryDto>(_country);
        }

        public async Task<bool> DeleteCountry(int country_id)
        {
            try
            {
                Country country = await _db.Countries.FirstOrDefaultAsync(c => c.Country_Id == country_id);
                if(country == null)
                {
                    return false;
                }
                _db.Countries.Remove(country);
                _db.SaveChanges();
                return true;
            }catch(Exception ex) {
                return false;
            }
        }

        public async Task<IEnumerable<CountryDto>> GetCountries()
        {
            IEnumerable<Country> countryList = await _db.Countries.ToListAsync();
             
            return _mapper.Map<List<CountryDto>>(countryList);
        }

        public async Task<CountryDto> GetCountryById(int country_id)
        {
            Country country = await _db.Countries.Where(c => c.Country_Id == country_id).FirstOrDefaultAsync();
            return _mapper.Map<CountryDto>(country);
        }
    }
}
