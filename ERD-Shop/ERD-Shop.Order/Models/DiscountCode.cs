using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class DiscountCode
    {
        public DiscountCode()
        {
            Orders = new HashSet<Order>();
        }

        public int CodeValueId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public int UsageLimit { get; set; }
        public string? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
