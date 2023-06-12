namespace ERD_Shop.Order.Models.DTOs
{
    public class DiscountCodeDto
    {
        public int CodeValueId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public int UsageLimit { get; set; }
        public string? UserId { get; set; }
    }
}