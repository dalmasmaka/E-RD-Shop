using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public partial class User
    {
        public User()
        {
            Stores = new HashSet<Stores>();
        }
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public int? ZipCode { get; set; }
        public DateTime? Birthdate { get; set; }
        public string? Role { get; set; }
        public int? CityId { get; set; }

        public virtual ICollection<Stores> Stores { get; set; }
    }
}
