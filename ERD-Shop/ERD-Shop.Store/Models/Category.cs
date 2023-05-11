using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public partial class Category
    {
        [BsonId]

        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryImg { get; set; }
    }
}
