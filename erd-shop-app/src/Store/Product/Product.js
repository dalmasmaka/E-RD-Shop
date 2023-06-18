import React, { useEffect, useState } from "react";
import iphone from "../Assets/img/iphone.png";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductCss.css";
import { getProductsByCategory } from "../../API/api";

const Product = ({ productid }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // Fetch product variants based on the productId
  // You can make an API call or use any other method to fetch the variants
  const handleGoToClick = (id) => {
    navigate(`/products/${id}`); // Redirect to the product variants page
  };
  // Assuming you have an array of variants for the selected product
  let { id } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(id);
      setProducts(data.result);
    };
    fetchProducts();
  }, []);
  // const products = [
  //   { id: 1, name: 'iphone', image:iphone },
  //   { id: 2, name: 'samsung', image:iphone },
  //   { id: 3, name: 'iphone13', image:iphone},
  //   { id: 4, name: 'samsung', image:iphone },
  //   { id: 5, name: 'iphone13', image:iphone}
  // ];
  return (
    <div className="product-var">
      <h2 className="product-title">Products</h2>
      <div className="category-products">
        <button onClick={() => console.log(products)}>Click</button>
        {/* {products.map((product) => {
          return (
            <div key={product.id}  onClick={() => handleGoToClick(product.id)}>
              <div className="product">
                <img alt="" src={product.image} />
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Product;
