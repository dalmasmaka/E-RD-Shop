using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class User
    {
        public User()
        {
            Stores = new HashSet<Store>();
        }

        public int UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public int? ZipCode { get; set; }
        public DateTime? Birthdate { get; set; }
        public int? RoleId { get; set; }
        public int? CityId { get; set; }

        public virtual ICollection<Store> Stores { get; set; }
    }
}
