using AutoMapper;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Models.DTOs;

namespace ERD_Shop.Order
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<OrderDto, Models.Order>();
                config.CreateMap<Models.Order, OrderDto>();
                config.CreateMap<User, UserDto>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}