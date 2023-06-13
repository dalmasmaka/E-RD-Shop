using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public partial class Stores
    {
        private static int lastStoreId = 0;
        public Stores()
        {
            Products = new HashSet<Product>();
            StoreId = GenerateNextStoreId();
        }
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public int StoreId { get; set; }
        public int? UserId { get; set; }
        public string? StoreName { get; set; }
        public string? StoreLocation { get; set; }
        public string? StoreOwner { get; set; }
        public string? StoreContact { get; set; }
        public string? StoreImg { get; set; }
        private static int GenerateNextStoreId()
        {
            lastStoreId++;
            return lastStoreId;
        }
        public virtual User? User { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
