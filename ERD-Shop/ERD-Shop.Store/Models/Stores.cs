using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace ERD_Shop.Store.Models
{
    public partial class Stores
    {
        public Stores()
        {
            Products = new HashSet<Product>();
        }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }

        [BsonElement("StoreId")]
        public int StoreId { get; set; }

        public int? UserId { get; set; }
        public string? StoreName { get; set; }
        public string? StoreLocation { get; set; }
        public string? StoreOwner { get; set; }
        public string? StoreContact { get; set; }
        public string? StoreImg { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
