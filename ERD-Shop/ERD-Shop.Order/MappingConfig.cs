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
                config.CreateMap<OrderDto, Models.Order>().ForMember(dest => dest.ProductVariants, opt => opt.Ignore());
                config.CreateMap<Models.Order, OrderDto>();
                config.CreateMap<Models.User, UserDto>().ReverseMap();
                config.CreateMap<ProductVariant, ProductVariantDto>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}