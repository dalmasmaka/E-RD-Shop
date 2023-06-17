namespace Store.Contracts;

public record OrderProductVariantCreated(int ProductVariantId, string ProductVariantName, float ProductVariantPrice);
public record OrderProductVariantUpdated(int ProductVariantId, string ProductVariantName, float ProductVariantPrice);
public record OrderProductVariantDeleted(int ProductVariantId);
public record UserProductVariantCreated(int ProductVariantId, string ProductVariantName, float ProductVariantPrice);
public record UserProductVariantUpdated(int ProductVariantId, string ProductVariantName, float ProductVariantPrice);
public record UserProductVariantDeleted(int Id);