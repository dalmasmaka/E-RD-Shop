import React, { useEffect, useState } from "react";
import iphone from "../Assets/img/iphone.png";
import { useParams } from "react-router-dom";
import "./ProductVariantsCss.css";
import { useNavigate } from "react-router-dom";
import { getVariantsByProduct } from "../../API/api";

const ProductVariants = ({ productid }) => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams();

  // Function to handle the "Go To" button click
  const handleGoToClick = (id) => {
    navigate(`/productvariants/${id}`); // Redirect to the product variants page
  };
  // useEffect(() => {
  //   const fetchProductVariants = async () => {
  //     const data = await getVariantsByProduct(id);
  //     setProducts(data.result);
  //   };
  //   fetchProductVariants();
  // }, []);

  const productVariants = [
    { id: 1, name: "iphone", image: iphone },
    { id: 2, name: "samsung", image: iphone },
    { id: 3, name: "iphone13", image: iphone },
    { id: 4, name: "samsung", image: iphone },
    { id: 5, name: "iphone13", image: iphone },
  ];
  return (
    <div className="product-var">
      <h2 className="product-title">Type</h2>
      <div className="category-products">
        {productVariants.map((productVariant) => (
          <div key={productVariant.id}>
            <div
              className="product"
              onClick={() => handleGoToClick(productVariant.id)}
            >
              <img alt="" src={productVariant.image} />
              <div className="product-info">
                <p className="product-name">{productVariant.name}</p>
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
