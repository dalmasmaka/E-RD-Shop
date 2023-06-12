namespace ERD_Shop.Order.Models.DTOs
{
    public class OrderProductDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string? UserId { get; set; }
    }
}
