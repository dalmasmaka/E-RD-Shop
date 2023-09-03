import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProductVariantDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineHeart,
  AiOutlineShopping,
  AiFillHeart,
  AiTwotoneShopping,
  AiFillShopping,
} from "react-icons/ai";
import { useParams } from "react-router";
import {
  getProductVariant,
  getProductVariants,
  getVariantsInUserWishlist,
  getVariantsInUserShoppingCart,
} from "../../API/Api";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";

const ProductVariantDetails = () => {
  const [isCartFilled, setIsCartFilled] = useState(false);
  const [count, setCount] = useState(0);
  const [variant, setVariant] = useState({});
  const [relevantVariants, setRelevantVariants] = useState([]);
  const [userId, setUserId] = useState("");
  const [productExistsWishlist, setProductExistsWishlist] = useState(false);
  const [productExistsCart, setProductExistsCart] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleGoToClick = (id) => {
    navigate(`/productvariants/${id}`);
  };
  let { id } = useParams();

  useEffect(() => {
    const fetchVariantDetails = async () => {
      const data = await getProductVariant(id);
      setVariant(data.result);
    };
    fetchVariantDetails();
  }, [id]);
  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }
  }, [params]);

  //setting the wishlist and shopping cart values
  useEffect(() => {
    fetchUserWishlistData();
    fetchUserCartData();
  }, [userId]);

  async function fetchUserWishlistData() {
    try {
      const userWishlist = await getVariantsInUserWishlist(userId);
      const wishlistProductExists =
        userWishlist.Result.find(
          (product) => product.ProductVariantId == id
        ) !== undefined;
      setProductExistsWishlist(wishlistProductExists);

      const userShoppingCart = await getVariantsInUserShoppingCart(userId);
      const shoppingCartProductExists =
        userShoppingCart.Result.find(
          (product) => product.ProductVariantId == id
        ) !== undefined;
      setProductExistsCart(shoppingCartProductExists);
    } catch (error) {
      console.error("ProductVariantDetails.js: line 85");
    }
  }

  async function fetchUserCartData() {
    try {
      const userShoppingCart = await getVariantsInUserShoppingCart(userId);
      const shoppingCartProductExists =
        userShoppingCart.Result.find(
          (product) => product.ProductVariantId == id
        ) !== undefined;
      setProductExistsCart(shoppingCartProductExists);
    } catch (error) {
      console.error("ProductVariantDetails.js: line 98");
    }
  }

  function parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddToWishlist = async (variant) => {
    const url = `${BASE_URL}/WishlistManagement`;
    const requestData = {
      UserId: userId,
      ProductId: variant.productVariantId,
    };
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Show Swal alert when wishlist is successfully updated
      toast.success("The store has been updated!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  const handleDeleteFromWishlist = async (variant) => {
    const url = `${BASE_URL}/WishlistManagement`;
    const requestData = {
      UserId: userId,
      ProductId: variant.productVariantId,
    };
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Show Swal alert when wishlist is successfully updated
      Swal.fire({
        icon: "success",
        title: "Added to Shopping Cart",
        showConfirmButton: false,
        timer: 4000,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding to shopping cart:", error);
    }
  };

  const handleAddToShoppingCart = (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`;
    const requestData = {
      UserId: userId,
      ProductId: variant.productVariantId,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.reload();
  };

  const handleDeleteFromShoppingCart = (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`;
    const requestData = {
      UserId: userId,
      ProductId: variant.productVariantId,
    };
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    const fetchRelevantVariants = async () => {
      const data = await getProductVariants();
      const filteredProductVariants = data.result
        .filter(
          (productVariant) => productVariant.productId === variant.productId
        )
        .filter((v) => v.productVariantId !== variant.productVariantId);
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
            Description:
            <span className="category-type"> {variant.shortDescription}</span>
          </p>
          <button
            className="btn-flex-details btn-wishlist-details"
            onClick={() =>
              productExistsWishlist
                ? handleDeleteFromWishlist(variant)
                : handleAddToWishlist(variant)
            }
          >
            {productExistsWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
          <button
            className="btn-flex-details btn-shopping-details"
            onClick={() =>
              productExistsCart
                ? handleDeleteFromShoppingCart(variant)
                : handleAddToShoppingCart(variant)
            }
          >
            {productExistsCart ? <AiTwotoneShopping /> : <AiOutlineShopping />}
          </button>
        </div>
      </div>
      {relevantVariants.length > 0 && (
        <h1 className="tekst-varianti">Similar Products</h1>
      )}
      <div className="category-products variante">
        {relevantVariants.map((productVariant) => (
          <div
            className="products-variant"
            key={productVariant.productVariantId}
          >
            <div
              className="product"
              onClick={() => handleGoToClick(productVariant.productVariantId)}
            >
              <img alt="" src={productVariant.productVariantImg} />
              <div className="product-info">
                <p className="product-name">
                  {productVariant.productVariantName}
                </p>
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
