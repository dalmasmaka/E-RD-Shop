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
        private readonly ICategoryRepository ICategoryRepository;
        public ProductRepository(IMapper mapper, IMongoDatabase database, IProductVariantRepository productVariantRepository)
        {
            _database = database;
            _mapper = mapper;
            dbCollection = database.GetCollection<Product>(collectionName);
            _productVariantRepository = productVariantRepository;
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
        //public async Task<Dictionary<string, List<Product>>> Top10ProductsByCategory()
        //{
        //    Dictionary<string, List<Product>> topProductsByCategory = new Dictionary<string, List<Product>>();

        //    // Retrieve all products from the database
        //    var products = await dbCollection.Find(filterBuilder.Empty).ToListAsync();

        //    // Group products by category
        //    var groupedProducts = products.GroupBy(p => p.CategoryId.ToString());

        //    // Iterate over each category
        //    foreach (var group in groupedProducts)
        //    {
        //        string category = group.Key;

        //        // Order products within the category by the number of occurrences
        //        var sortedProducts = group.OrderByDescending(p => group.Count()).Take(10).ToList();

        //        // Add the top 10 products to the dictionary
        //        topProductsByCategory[category] = sortedProducts;
        //    }

        //    return topProductsByCategory;
        //}

        public async Task<Dictionary<string, CategoryInfo>> Top10ProductsByCategory()
        {
            Dictionary<string, CategoryInfo> topProductsByCategory = new Dictionary<string, CategoryInfo>();

            // Retrieve all products from the database
            var products = await dbCollection.Find(filterBuilder.Empty).ToListAsync();

            // Group products by category
            var groupedProducts = products.GroupBy(p => p.CategoryId.ToString());

            // Iterate over each category
            foreach (var group in groupedProducts)
            {
                string categoryId = group.Key;

                // Get the category name for the current category ID
                var category = await GetCategoryName(categoryId);

                // Order products within the category by the number of occurrences
                var sortedProducts = group.OrderByDescending(p => group.Count()).Take(10).ToList();

                // Create a CategoryInfo object to store the category ID, category name, and count
                var categoryInfo = new CategoryInfo
                {
                    CategoryId = int.Parse(categoryId),
                    CategoryName = category.CategoryName,
                    Count = sortedProducts.Count
                };

                // Add the top 10 products to the dictionary
                topProductsByCategory[categoryId] = categoryInfo;
            }

            return topProductsByCategory;
        }

        private async Task<Category> GetCategoryName(string categoryId)
        {
            // Retrieve the category with the specified ID from the database
            var category = await categorydbCollection.Find(c => c.CategoryId.ToString() == categoryId).FirstOrDefaultAsync();
            return category;
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

        
    }
}
