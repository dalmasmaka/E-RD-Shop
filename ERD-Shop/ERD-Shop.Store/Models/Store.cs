using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class Store
    {
        public int StoreId { get; set; }
        public string? StoreName { get; set; }
        public string? StoreLocation { get; set; }
        public string? StoreOwner { get; set; }
        public string? StoreContact { get; set; }
        public string? StoreImg { get; set; }
    }
}
