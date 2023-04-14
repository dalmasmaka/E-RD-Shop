using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class Category
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryImg { get; set; }
    }
}
