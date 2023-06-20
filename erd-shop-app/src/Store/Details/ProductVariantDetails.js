import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import iphone1 from "../Assets/img/iphone14.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProductVariantDetailsCss.css";
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiFillHeart,
  AiTwotoneShopping,
  AiFillShopping,
} from "react-icons/ai";
import { useParams } from "react-router";
import { getVariantDetails,getVariantsByProduct,getProductVariants,getStoreById } from "../../API/api";
import { BASE_URL } from "../../API/api";
import { getVariantsInWishlist } from "../../API/api";
import { getVariantsInShoppingCart } from "../../API/api";

const ProductVariantDetails = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const [count, setCount] = useState(0);
  const [variant, setVariant] = useState({})
  const [relevantVariants, setRelevantVariants] = useState([]);
  const navigate = useNavigate();
  // const [products, setProducts] = useState([]);
  const handleGoToClick = (id) => {
    navigate(`/productvariants/${id}`); // Redirect to the product variants page
  };

  let {id}= useParams();
  
    useEffect(() => {
      const fetchVariantDetails = async () => {
        const data = await getVariantDetails(id);
        setVariant(data.result);
      };
      fetchVariantDetails();
  }, [id]);


  const handleAddToWishlist = (variant) => {
    const url = `${BASE_URL}/WishlistManagement`;
    const requestData = {
      variant: variant,
      quantity: count
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
          'Content-Type': 'application/json',
      },
  })
  setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToShoppingCart = (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`;
    const requestData = {
      variant: variant,
      quantity: count
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
          'Content-Type': 'application/json',
      },
  })
  setIsCartFilled(!isCartFilled);
  };

  const incrementCount = () => {
    if(count < variant.stockQuantity){
      setCount((prevCount) => prevCount + 1);
    };
  }

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  useEffect(() => {
    const fetchRelevantVariants = async () => {
      const data = await getProductVariants();
      const filteredProductVariants = data.result.filter(
        (productVariant) => productVariant.productId === variant.productId
      ).filter((v) => v.productVariantId !== variant.productVariantId);
      setRelevantVariants(filteredProductVariants);
    };
    if (variant.productId) {
      fetchRelevantVariants();
    }
  }, [variant]);
  return (
    <div className="all-container">
    <div className="container">
      <div className="leftDiv">
        <img alt="" src={variant.productVariantImg}></img>
      </div>
      <div className="rightDiv">
        <h2 className="variant-title">{variant.productVariantName}</h2>
        <h4 className="variant-price">
          Price:<span className="product-price">{variant.price}$</span>
        </h4>
        <p className="variant-category">
          Description:<span className="category-type"> {variant.shortDescription}</span>
        </p>
        <div className="quantity">
          <button
            className="quantity-btn decrease-btn"
            onClick={decrementCount}
          >
            <FaChevronLeft />
          </button>
          <span> {count} </span>
          <button
            className="quantity-btn increase-btn"
            onClick={incrementCount}
          >
            <FaChevronRight />
          </button>
        </div>
        <button
          className="btn-flex-details btn-wishlist-details"
          onClick={() => handleAddToWishlist(variant)}
        >
          {isHeartFilled ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
        <button
          className="btn-flex-details btn-shopping-details"
          onClick={() => handleAddToShoppingCart(variant)}
        >
          {isCartFilled ? <AiTwotoneShopping /> : <AiOutlineShopping />}
        </button>
      </div>
    </div>
    <h1 className="tekst-varianti">Similar Products</h1>
    <div className="category-products variante">
        {relevantVariants.map((productVariant) => (
          <div className="products-variant" key={productVariant.productVariantId}>
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

export default ProductVariantDetails;
