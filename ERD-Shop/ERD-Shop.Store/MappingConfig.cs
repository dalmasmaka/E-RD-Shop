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
                config.CreateMap<Stores, StoreDto>();
                config.CreateMap<Category, CategoryDto>();
                config.CreateMap<Product, ProductDto>();
                config.CreateMap<ProductVariant, ProductVariantDto>();
            });
            return mappingConfig;
        }
    }
}