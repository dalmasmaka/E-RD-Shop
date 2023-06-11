using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class Refund
    {
        public int RefundId { get; set; }
        public DateTime? RefundDate { get; set; }
        public string? RefundStatus { get; set; }
        public int? OrderId { get; set; }
        public string? UserId { get; set; }

        public virtual Order? Order { get; set; }
        public virtual User? User { get; set; }
    }
}
