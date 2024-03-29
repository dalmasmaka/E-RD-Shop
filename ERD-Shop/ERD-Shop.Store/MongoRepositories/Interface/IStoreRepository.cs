﻿using ERD_Shop.Store.Models.DTOs;
using MongoDB.Bson;

namespace ERD_Shop.Store.MongoRepositories.Interface
{
    public interface IStoreRepository
    {
        Task<ICollection<StoreDto>> GetAllAsync();
        Task<StoreDto> GetAsync(int id);
        Task<int> GetStoresCount();
        Task<StoreDto> GetStoreByStoreKeeper(string userId);
        Task<StoreDto> CreateAsync(StoreDto store);
        Task<StoreDto> UpdateAsync(StoreDto store);
        Task<StoreDto> DeleteAsync(int id);
    }
}
