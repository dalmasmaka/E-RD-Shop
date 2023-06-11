using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Stores, StoreDto>().ReverseMap();
                config.CreateMap<Category, CategoryDto>();
                config.CreateMap<CategoryDto, Category>().ForMember(dest => dest._id, opt => opt.Ignore());
                config.CreateMap<Product, ProductDto>().ReverseMap();
                config.CreateMap<ProductVariant, ProductVariantDto>().ReverseMap();
                config.CreateMap<Models.User, UserDto>().ReverseMap();
                //config.CreateMap<UserDto, Models.User>().ForMember(dest => dest._Id, opt => opt.Ignore());
            });
            return mappingConfig;
        }
    }
}