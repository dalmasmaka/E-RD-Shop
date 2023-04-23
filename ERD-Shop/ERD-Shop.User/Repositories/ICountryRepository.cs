using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories
{
    public interface ICountryRepository
    {
        Task<IEnumerable<CountryDto>> GetCountries();
        Task<CountryDto> GetCountryById(int country_id);
        Task<CountryDto> CreateUpdateCountry(CountryDto country);
        Task<bool> DeleteCountry(int country_id);
    }
}
