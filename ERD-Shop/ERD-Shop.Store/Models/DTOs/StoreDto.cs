﻿using MongoDB.Bson;

namespace ERD_Shop.Store.Models.DTOs
{
    public class StoreDto
    {
        public int StoreId { get; set; }
        public string? UserId { get; set; }
        public string? StoreName { get; set; }
        public string? StoreLocation { get; set; }
        public string? StoreOwner { get; set; }
        public string? StoreContact { get; set; }
        public string? StoreImg { get; set; }
    }
}
