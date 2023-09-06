﻿using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories.Interface
{
    public interface ICategoryRepository
    {
        Task<ICollection<CategoryDto>> GetAllAsync();
        Task<CategoryDto> GetAsync(int id);
        Task<int> GetCategoriesCount();
        Task<Category> GetCategoryName(int categoryId);
        Task<CategoryDto> CreateAsync(CategoryDto category);
        Task<CategoryDto> UpdateAsync(CategoryDto category);
        Task<CategoryDto> DeleteAsync(int id);
    }
}
