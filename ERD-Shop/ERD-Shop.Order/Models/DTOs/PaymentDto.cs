namespace ERD_Shop.Order.Models.DTOs
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public bool PaymentMethod { get; set; }
        public string CardOwner { get; set; } = null!;
        public long CardNumber { get; set; }
        public string ExpiryNumber { get; set; } = null!;
        public string Cvc { get; set; } = null!;
        public int? OrderId { get; set; }

        public virtual Order? Order { get; set; }
    }
}
