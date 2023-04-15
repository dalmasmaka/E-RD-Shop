﻿using System;
using System.Collections.Generic;

namespace ERD_Shop.Store.Models
{
    public partial class ProductVariant
    {
        public ProductVariant()
        {
            Products = new HashSet<Product>();
        }

        public int ProductVariantId { get; set; }
        public string? ProductVariantName { get; set; }
        public string? SkuCode { get; set; }
        public int? StockQuantity { get; set; }
        public string? ShortDescription { get; set; }
        public string? ProductVariantImg { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}