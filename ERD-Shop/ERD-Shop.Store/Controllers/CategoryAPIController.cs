using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/categories")]
    public class CategoryAPIController : ControllerBase
    {
        protected ResponseDto _response;
        private ICategoryRepository _categoryRepository;
        public CategoryAPIController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
            this._response = new ResponseDto();
        }


        [HttpGet]
        [Route("{id}")]
        public ActionResult<Category> GetCategoryByID(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }
        [HttpPost]
        public ActionResult<Category>Post (Category category)
        {
            _categoryRepository.Create(category);
            return CreatedAtAction(nameof(GetCategoryByID), new { id = category.CategoryId }, category);
        }
        [HttpPut("{id}")]
        public ActionResult Put(int id, Category category)
        {
            var existingCategory = _categoryRepository.GetCategoryById(id);
            if(existingCategory == null)
            {
                return NotFound();
            }
            _categoryRepository.Update(id, category);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            _categoryRepository.Delete(category.CategoryId);
            return Ok();
        }
    }    
}
