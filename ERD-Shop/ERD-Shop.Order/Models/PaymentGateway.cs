using System;
using System.Collections.Generic;

namespace ERD_Shop.Order.Models
{
    public partial class PaymentGateway
    {
        public int PaymentGatewayId { get; set; }
        public string? PaymentGatewayName { get; set; }
        public float? PaymentAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public string? PaymentMethod { get; set; }
        public int? PaymentTransactionId { get; set; }
    }
}
