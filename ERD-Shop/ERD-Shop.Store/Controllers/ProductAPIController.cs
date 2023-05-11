using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/products")]
    public class ProductAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private IProductRepository _productRepository;

        public ProductAPIController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
            this._response = new ResponseDto();
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Product>GetProductById(int id)
        {
            var product = _productRepository.GetProductById(id);
            if(product ==null)
            {
                return NotFound();
            }
            return product;
        }
        [HttpPost]
        public ActionResult<Product>Post(Product product)
        {
            _productRepository.Create(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, Product product)
        {
            var existingProduct = _productRepository.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            _productRepository.Update(id, product);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            _productRepository.Delete(product.ProductId);
            return Ok();
        }
    }
}
