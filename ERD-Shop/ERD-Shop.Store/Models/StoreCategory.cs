using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class StoreCategory
    {
        public int? StoreId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Stores? Store { get; set; }
    }
}
