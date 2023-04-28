namespace ERD_Shop.Order.Models.DTOs
{
    public class RefundDto
    {
        public int RefundId { get; set; }
        public DateTime? RefundDate { get; set; }
        public string? RefundStatus { get; set; }
        public int? OrderId { get; set; }
        public int? UserId { get; set; }
    }
}