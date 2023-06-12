using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class Order
    {
        public Order()
        {
            Refunds = new HashSet<Refund>();
            ProductVariants = new HashSet<ProductVariant>();
        }

        public int OrderId { get; set; }
        public float? TotalPrice { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public string? UserId { get; set; }
        public int? CodeValueId { get; set; }

        public virtual DiscountCode? CodeValue { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Refund>? Refunds { get; set; }

        public virtual ICollection<ProductVariant>? ProductVariants { get; set; }
    }
}
