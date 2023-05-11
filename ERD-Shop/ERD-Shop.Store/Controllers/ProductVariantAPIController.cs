using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/productVariants")]
    public class ProductVariantAPIController : ControllerBase
    {
        private IProductVariantRepository _productVariantRepository;
        public ProductVariantAPIController(IProductVariantRepository productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }
        [HttpGet("{id}")]
        public ActionResult<ProductVariant>GetProductVariantById(int id)
        {
            var productVariant = _productVariantRepository.GetProductVariantById(id);
            if(productVariant== null) {
                return NotFound();
            }
            return productVariant;
        }
        [HttpPost]
        public ActionResult<ProductVariant>Post(ProductVariant productVariant)
        {
            _productVariantRepository.Create(productVariant);
            return CreatedAtRoute(nameof(GetProductVariantById), new { id = productVariant.ProductVariantId }, productVariant);
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, ProductVariant productVariant)
        {
            var existingProductVariant = _productVariantRepository.GetProductVariantById(id);
            if(existingProductVariant== null)
            {
                return NotFound();
            }
            _productVariantRepository.Update(id, productVariant);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id) {
            var productVariant = _productVariantRepository.GetProductVariantById(id);
            if(productVariant== null)
            {
                return NotFound();
            }
            _productVariantRepository.Delete(id);
            return Ok();
        }
        
    }
}
