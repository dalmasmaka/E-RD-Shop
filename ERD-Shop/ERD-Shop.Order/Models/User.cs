using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class User
    {
        public User()
        {
            DiscountCodes = new HashSet<DiscountCode>();
            Orders = new HashSet<Order>();
            Refunds = new HashSet<Refund>();
        }

        public string UserId { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int? ZipCode { get; set; }
        public DateTime? Birthdate { get; set; }
        public string? Role { get; set; }
        public int? CityId { get; set; }
        public string? Address { get; set; }

        public virtual ICollection<DiscountCode> DiscountCodes { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Refund> Refunds { get; set; }
    }
}
