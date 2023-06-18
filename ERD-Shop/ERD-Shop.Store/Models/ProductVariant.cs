using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ERD_Shop.Store.Models
{
    public  class ProductVariant
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        [BsonElement("ProductVariantId")]
        public int ProductVariantId { get; set; }
        public string? ProductVariantName { get; set; }
        public string? Barcode { get; set; }
        public string? SkuCode { get; set; }
        public double? SupplyPrice { get; set; }
        public int? StockQuantity { get; set; }
        public double? TotalSupplyPrice { get; set; } // kalkulohet nga supply price per nje produkt variant me numrin e stokut
        public float Price { get; set; }
        public string? ShortDescription { get; set; }
        public string? ProductVariantImg { get; set; }
        public int? ProductId { get; set; }

    }
}
