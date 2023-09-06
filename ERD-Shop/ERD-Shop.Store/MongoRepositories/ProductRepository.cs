using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class ProductRepository : IProductRepository
    {
        private const string collectionName = "Products";
        private readonly IMongoCollection<Product> dbCollection;
        private readonly IMongoCollection<Category> categorydbCollection;
        private readonly FilterDefinitionBuilder<Product> filterBuilder = Builders<Product>.Filter;
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        private readonly IProductVariantRepository _productVariantRepository;
        private readonly ICategoryRepository _categoryRepository;
        public ProductRepository(IMapper mapper, IMongoDatabase database, IProductVariantRepository productVariantRepository, ICategoryRepository categoryRepository)
        {
            _database = database;
            _mapper = mapper;
            dbCollection = database.GetCollection<Product>(collectionName);
            _productVariantRepository = productVariantRepository;
            _categoryRepository= categoryRepository;
        }
        private static int GetNextSequenceValue(IMongoDatabase database, string collectionName)
        {
            var countersCollection = database.GetCollection<BsonDocument>("ProductCounters");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", collectionName);
            var update = Builders<BsonDocument>.Update.Inc("seq", 1);
            var options = new FindOneAndUpdateOptions<BsonDocument>
            {
                ReturnDocument = ReturnDocument.After,
                IsUpsert = true
            };

            var result = countersCollection.FindOneAndUpdate(filter, update, options);
            return result["seq"].AsInt32;
        }
        public async Task<Dictionary<int, CategoryInfo>> Top10ProductsByCategory()
        {
            Dictionary<int, CategoryInfo> topProductsByCategory = new Dictionary<int, CategoryInfo>();

            // Retrieve all products from the database
            var products = await dbCollection.Find(filterBuilder.Empty).ToListAsync();

            // Group products by category
            var groupedProducts = products.GroupBy(p => p.CategoryId);

            // Iterate over each category
            foreach (var group in groupedProducts)
            {
                int? categoryIdNullable = group.Key; // Use nullable int

                if (categoryIdNullable.HasValue)
                {
                    int categoryId = categoryIdNullable.Value; // Extract the value

                    //// Get the category name for the current category ID
                    var category = await _categoryRepository.GetCategoryName(categoryId);

                    // Order products within the category by the number of occurrences
                    var sortedProducts = group.OrderByDescending(p => group.Count()).Take(10).ToList();

                    // Create a CategoryInfo object to store the category ID, category name, and count
                    var categoryInfo = new CategoryInfo
                    {
                        CategoryId = categoryId,
                        CategoryName = category.CategoryName,
                        Count = sortedProducts.Count
                    };

                    // Add the top 10 products to the dictionary
                    topProductsByCategory[categoryId] = categoryInfo;
                }
                else
                {
                    // Handle the case where CategoryId is null (if needed)
                }
            }

            return topProductsByCategory;
        }



        public async Task<ProductDto> CreateAsync([FromBody]ProductDto productDto)
        {
            if(productDto == null) throw new ArgumentNullException(nameof(productDto));
            int nextProductId = GetNextSequenceValue(_database, collectionName);
            productDto.ProductId = nextProductId;
            Product product = _mapper.Map<ProductDto, Product>(productDto);
            await dbCollection.InsertOneAsync(product);
            return productDto;
        }

        public async Task<ProductDto> DeleteAsync(int id)
        {
            ICollection<ProductVariantDto> productVariants = await _productVariantRepository.GetAllAsync();
            bool hasAssociatedVariant = productVariants.Any(pv => pv.ProductId == id);
            if (hasAssociatedVariant)
            {
                throw new Exception("Product cannot be deleted because it has associated product variants.");
            }
            FilterDefinition<Product> filter = filterBuilder.Eq(products => products.ProductId, id);
            Product product = await dbCollection.Find(filter).FirstOrDefaultAsync();
            await dbCollection.DeleteOneAsync(filter);
            return _mapper.Map<ProductDto>(product);    
        }

        public async Task<ICollection<ProductDto>> GetAllAsync()
        {
            var products = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return _mapper.Map<ICollection<ProductDto>>(products);
        }

        public async Task<ProductDto> GetByIdAsync(int id)
        {
            FilterDefinition<Product> filter = filterBuilder.Eq(products => products.ProductId, id);
            Product product = await dbCollection.Find(filter).FirstOrDefaultAsync();
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> UpdateAsync(ProductDto productDto)
        {
            if (productDto == null)
            {
                throw new ArgumentNullException(nameof(productDto));    

            }
            FilterDefinition<Product> filter = filterBuilder.Eq(existingProduct => existingProduct.ProductId, productDto.ProductId);
            Product product = await dbCollection.Find(filter).FirstOrDefaultAsync();

            UpdateDefinition<Product> update = Builders<Product>.Update
                .Set(existingProduct => existingProduct.ProductName, productDto.ProductName)
                .Set(existingProduct => existingProduct.ProductImg, productDto.ProductImg)
                .Set(existingProduct => existingProduct.IsTransportable, productDto.IsTransportable)
                .Set(existingProduct => existingProduct.StoreId, productDto.StoreId)
                .Set(existingProduct => existingProduct.CategoryId, productDto.CategoryId);
            await dbCollection.UpdateOneAsync(filter, update);
            return productDto;
        }

        public async Task<ICollection<ProductDto>> GetProductsByStore(int storeId)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.StoreId, storeId);
            var products = await dbCollection.Find(filter).ToListAsync();
            return _mapper.Map<ICollection<ProductDto>>(products);
        }

        public async Task<int> GetProductsCount()
        {
            var count = await dbCollection.CountDocumentsAsync(_ => true);
            return (int)count;
        }
    }
}
