namespace ERD_Shop.Order.Models.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public float? TotalPrice { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public string? UserId { get; set; }
        public int? CodeValueId { get; set; }
        public virtual ICollection<ProductVariant>? ProductVariants { get; set; }
    }
}