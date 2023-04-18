namespace ERD_Shop.Store.Models.DTOs
{
    public class ProductVariantDto
    {
        public int ProductVariantId { get; set; }
        public string? ProductVariantName { get; set; }
        public string? SkuCode { get; set; }
        public int? StockQuantity { get; set; }
        public string? ShortDescription { get; set; }
        public string? ProductVariantImg { get; set; }
    }
}
