using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class ProductVariant
    {
        public ProductVariant()
        {
            Orders = new HashSet<Order>();
        }

        public int ProductVariantId { get; set; }
        public string? Name { get; set; }
        public int? Price { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
