using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using MongoDB.Driver;

namespace ERD_Shop.Store.MongoRepositories
{
    public class ProductRepository : IProductRepository
    {
        private const string collectionName = "Products";
        private readonly IMongoCollection<Product> dbCollection;
        private readonly FilterDefinitionBuilder<Product> filterBuilder = Builders<Product>.Filter;
        private readonly IMapper _mapper;

        public ProductRepository(IMapper mapper, IMongoDatabase database)
        {
            _mapper = mapper;
            dbCollection = database.GetCollection<Product>(collectionName);
        }
        public async Task<ProductDto> CreateAsync(ProductDto productDto)
        {
            if(productDto == null) throw new ArgumentNullException(nameof(productDto));
            Product product = _mapper.Map<ProductDto, Product>(productDto);
            await dbCollection.InsertOneAsync(product);
            return productDto;
        }

        public async Task<ProductDto> DeleteAsync(int id)
        {
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
            await dbCollection.ReplaceOneAsync(filter, product);
            return productDto;
        }
    }
}
