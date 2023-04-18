using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class Store
    {
        public Store()
        {
            Products = new HashSet<Product>();
        }

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
