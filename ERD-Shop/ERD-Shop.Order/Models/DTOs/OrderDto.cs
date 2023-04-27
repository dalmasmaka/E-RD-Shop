namespace ERD_Shop.Order.Models.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public float? TotalPrice { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public int? UserId { get; set; }
        public int? CodeValueId { get; set; }

        public virtual DiscountCode? CodeValue { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Refund> Refunds { get; set; }

        public virtual ICollection<ProductVariant> ProductVariants { get; set; }
    }
}
