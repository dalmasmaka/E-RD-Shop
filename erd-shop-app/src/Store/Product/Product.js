import React from 'react';
import iphone from '../Assets/img/iphone.png'
import { useParams,useNavigate  } from "react-router-dom"
import './ProductCss.css';




const Product = ({ productid }) => {
  const navigate = useNavigate();
  // Fetch product variants based on the productId
  // You can make an API call or use any other method to fetch the variants
  const handleGoToClick = () => {
    navigate(`/products/${id}`); // Redirect to the product variants page
  };
  // Assuming you have an array of variants for the selected product
  const products = [
    { id: 1, name: 'iphone', image:iphone },
    { id: 2, name: 'samsung', image:iphone },
    { id: 3, name: 'iphone13', image:iphone},
    { id: 4, name: 'samsung', image:iphone },
    { id: 5, name: 'iphone13', image:iphone}
  ];
  let { id } = useParams();
  return (
    <div className='product-var'>
      <h2 className='product-title'>Products</h2>
      <div className='category-products' onClick={handleGoToClick}>
      {products.map((product) => (
        <div key={product.id}>
         <div className='product'>
          <img alt='' src={product.image} />
          <div className='product-info' >
            <p className='product-name'>{product.name}</p>
          </div>
         </div>
      </div>
      ))}
    </div>
    </div>
  );
};

export default Product;
