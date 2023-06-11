using ERD_Shop.User.Models.DTO;

namespace ERD_Shop.User.Repositories.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<CityDto>> GetCities();
        Task<CityDto> GetCityById(int city_id);
        Task<CityDto> CreateUpdateCity(CityDto city);
        Task<bool> DeleteCity(int city_id);
    }
}
