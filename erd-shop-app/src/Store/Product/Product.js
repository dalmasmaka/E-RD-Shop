import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory, getProducts } from "../../API/api";
import "./ProductCss.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const handleGoToClick = (id) => {
    navigate(`/products/${id}`);
  };

  let { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getProductsByCategory(id);
      setCategory(data.result);
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      const filteredProducts = data.result.filter(
        (product) => product.categoryId === category.categoryId
      );
      setProducts(filteredProducts);
    };
    if (category.categoryId) {
      fetchProducts();
    }
  }, [category]);

  return (
    <div className="product-var">
      <h2 className="product-title">Products</h2>
      <div className="category-products">
        {products.map((product) => (
          <div key={product.productId} onClick={() => handleGoToClick(product.productId)}>
            <div className="product">
              <img alt="" src={product.productImg} />
              <div className="product-info">
                <p className="product-name">{product.productName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
 