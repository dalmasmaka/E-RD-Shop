
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CategoryType.css';
import ProductVariants from '../Product/Product'

const CategoryType = ({ id, name, image }) => {
  const navigate = useNavigate();

  // Function to handle the "Go To" button click
  const handleGoToClick = () => {
    navigate(`/category/${id}`); // Redirect to the product variants page
  };

  return (
    <div className='product'>
      <img alt='' src={image} />
      <div className='product-info'>
        <p className='product-name'>{name}</p>
        <button className='goto-btn' onClick={handleGoToClick}>
          Go To
        </button>
      </div>
    </div>
  );
};
export default CategoryType;

