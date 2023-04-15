﻿using ERD_Shop.Store.Models.DTOs;

namespace ERD_Shop.Store.Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetCategories();
        Task<CategoryDto> GetCategoryById(int CategoryId);
        Task<CategoryDto> CreateUpdateProduct(CategoryDto categoryDto);
        Task<bool> DeleteProduct(int CategoryId);

    }
}