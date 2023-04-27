namespace ERD_Shop.Order.Models.DTOs
{
    public class DiscountCodeDto
    {
        public int CodeValueId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public int UsageLimit { get; set; }
        public int? UserId { get; set; }
    }
}
