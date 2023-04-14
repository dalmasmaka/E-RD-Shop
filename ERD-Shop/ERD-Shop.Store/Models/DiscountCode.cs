using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class DiscountCode
    {
        public int DiscountId { get; set; }
        public string? CodeValue { get; set; }
        public bool? Expiration { get; set; }
    }
}
