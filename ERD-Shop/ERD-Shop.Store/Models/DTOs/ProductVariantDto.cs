namespace ERD_Shop.Store.Models.DTOs
{
    public class ProductVariantDto
    {
        public int ProductVariantId { get; set; }
        public string? ProductVariantName { get; set; }
        public int? Price { get; set; }
        public string? SkuCode { get; set; }
        public int? StockQuantity { get; set; }
        public string? ShortDescription { get; set; }
        public string? ProductVariantImg { get; set; }
        public string? Barcode { get; set; }
        public double? SupplyPrice { get; set; }
        public double? TotalSupplyPrice { get; set; }
        public int? ProductId { get; set; }
    }
}
