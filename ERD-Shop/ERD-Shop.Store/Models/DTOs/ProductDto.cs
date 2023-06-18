namespace ERD_Shop.Store.Models.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImg { get; set; }
        public bool IsTransportable { get; set; }
        public int? StoreId { get; set; }
        public int? CategoryId { get; set; }

    }
}
