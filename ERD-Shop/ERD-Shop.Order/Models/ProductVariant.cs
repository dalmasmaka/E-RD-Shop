using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Order.Models
{
    public partial class ProductVariant
    {
        public ProductVariant()
        {
            Orders = new HashSet<Order>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductVariantId { get; set; }
        public string? Name { get; set; }
        public float? Price { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
