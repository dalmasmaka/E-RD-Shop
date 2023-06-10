﻿using ERD_Shop.Store.Models.DTOs;
using ERD_Shop.Store.MongoRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;

namespace ERD_Shop.Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        public IProductRepository _productRepository;
        public ResponseDto _response;
        public ProductController(IProductRepository productRepository, ResponseDto response)
        {
            _productRepository = productRepository;
            _response = response;
        }
        [HttpGet]
        public async Task<ResponseDto> GetAllAsync()
        {
            try
            {
                var result = await _productRepository.GetAllAsync();
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpGet("{id}")]
        public async Task<ResponseDto> GetAsync(int id)
        {
            try
            {
                var result = await _productRepository.GetByIdAsync(id);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPost]
        public async Task<ResponseDto> CreateAsync(ProductDto product)
        {
            try
            {
                var result = await _productRepository.CreateAsync(product);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpPut]
        public async Task<ResponseDto> UpdateAsync(ProductDto product)
        {
            try
            {
                var result = await _productRepository.UpdateAsync(product);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
        [HttpDelete]
        public async Task<ResponseDto> DeleteAsync(int id)
        {
            try
            {
                var result = await _productRepository.DeleteAsync(id);
                _response.isSuccess = true;
                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.isSuccess = false;
                _response.ErrorMessage = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
}