using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public partial class Product
    {
        [BsonId]

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImg { get; set; }
        public int? ProductVariantId { get; set; }
        public int? StoreId { get; set; }

        public virtual ProductVariant? ProductVariant { get; set; }
        public virtual Stores? Store { get; set; }
    }
}
