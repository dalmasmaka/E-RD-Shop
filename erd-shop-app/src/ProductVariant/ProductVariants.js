import React from 'react';
import iphone from '../Assets/img/iphone.png'
import { useParams } from "react-router-dom"
import './ProductVariantsCss.css';
import { AiOutlineHeart, AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductVariants = ({ productid }) => {
  // Fetch product variants based on the productId
  // You can make an API call or use any other method to fetch the variants

  // Assuming you have an array of variants for the selected product
  const productVariants = [
    { id: 1, name: 'iphone', image:iphone },
    { id: 2, name: 'samsung', image:iphone },
    { id: 3, name: 'iphone13', image:iphone},
    { id: 4, name: 'samsung', image:iphone },
    { id: 5, name: 'iphone13', image:iphone}
  ];
  let { id } = useParams();
  return (
    <div className='product-var'>
      <h2 className='product-title'>Type</h2>
      <div className='category-products'>
      {productVariants.map((productVariant) => (
        <div key={productVariant.id}> <div className='product'>
        <img alt='' src={productVariant.image} />
        <div className='product-info'>
          <p className='product-name'>{productVariant.name}</p>
          <div className='btn-flex'>
          <button className='goto-btn details'>
            Details
          </button>
          <button className='btn-flex btn-wishlist'><AiOutlineHeart /></button>
          <button className='btn-flex btn-shopping'><AiOutlineShopping /></button>
        </div>
        </div>
      </div></div>
      ))}
    </div>
    </div>
  );
};

export default ProductVariants;
