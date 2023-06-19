﻿using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories.Interface;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class ProductRepository : IProductRepository
    {
        private const string collectionName = "Products";
        private readonly IMongoCollection<Product> dbCollection;
        private readonly FilterDefinitionBuilder<Product> filterBuilder = Builders<Product>.Filter;
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        private readonly IProductVariantRepository _productVariantRepository;
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
