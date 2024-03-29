﻿using AutoMapper;
using ERD_Shop.User.Models.DTO;
using ERD_Shop.User.Models;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ERD_Shop.User
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CountryDto, Country>().ReverseMap();
                config.CreateMap<CityDto, City>().ReverseMap();
                config.CreateMap<WishlistDto, Wishlist>().ReverseMap();
                config.CreateMap<ShoppingCartDto, ShoppingCart>().ReverseMap();
                config.CreateMap<IProductVariantDto, IProductVariant>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}
