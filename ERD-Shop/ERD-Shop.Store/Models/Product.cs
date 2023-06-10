using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public partial class Product
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImg { get; set; }
        public int? StoreId { get; set; }
        public virtual Stores? Store { get; set; }
    }
}
