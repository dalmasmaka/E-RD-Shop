using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ERD_Shop.Store.Models.DTOs
{
    public class CategoryDto
    {
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryImg { get; set; }
    }
}
