import React, { useEffect, useState } from "react";
import iphone from "../Assets/img/iphone.png";
import { useParams } from "react-router-dom";
import "./ProductVariantsCss.css";
import { useNavigate } from "react-router-dom";
import { getVariantsByProduct,getProductVariants } from "../../API/api";

const ProductVariants = ({ productid }) => {
  const [products, setProducts] = useState([]);
  const [productVariants, setProductVariants] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams();

  // Function to handle the "Go To" button click
  const handleGoToClick = (id) => {
    navigate(`/productvariants/${id}`); // Redirect to the product variants page
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getVariantsByProduct(id);
      setProducts(data.result);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProductVariants = async () => {
      const data = await getProductVariants();
      const filteredProductVariants = data.result.filter(
        (productVariant) => productVariant.productId === products.productId
      );
      setProductVariants(filteredProductVariants);
    };
    if (products.productId) {
      fetchProductVariants();
    }
  }, [products]);

  return (
    <div className="product-var">
      <h2 className="product-title">Type</h2>
      <div className="category-products">
        {productVariants.map((productVariant) => (
          <div key={productVariant.productVariantId}>
            <div
              className="product"
              onClick={() => handleGoToClick(productVariant.productVariantId)}
            >
              <img alt="" src={productVariant.productVariantImg} />
              <div className="product-info">
                <p className="product-name">{productVariant.productVariantName}</p>
                <div className="btn-flex"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;
