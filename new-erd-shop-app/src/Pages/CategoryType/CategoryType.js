
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CategoryType.css';
/*import Product from '../Product/Product'*/

const CategoryType = ({ id, name, image }) => {
  const navigate = useNavigate();

  // Function to handle the "Go To" button click
  const handleGoToClick = () => {
    navigate(`/category/${id}`); // Redirect to the product variants page
  };

  return (
    <div className='product' onClick={handleGoToClick}>
      <img alt='' src={image} />
      <div className='product-info'>
        <p className='product-name'>{name}</p>
      </div>
    </div>
  );
};
export default CategoryType;