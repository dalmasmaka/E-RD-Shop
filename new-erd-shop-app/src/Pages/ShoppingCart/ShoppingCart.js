import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import {
  BASE_URL,
  getVariantsInUserShoppingCart,
  getProductVariants,
} from "../../API/Api";
import { getVariantsInShoppingCart } from "../../API/Api";
import { getUser } from "../../API/Api";
import { useParams } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [count, setCount] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [userId, setUserId] = useState("");

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

  const clearShoppingCart = () => {
    const url = `${BASE_URL}/ShoppingCartManagement/${userId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const clearVariantfromShoppingCart = async (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`;
    const requestData = {
      UserId: userId,
      ProductId: variant.productVariantId,
    };
    await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };

  const handleGoToClick = () => {
    navigate("/orderpage"); // Redirect to the product variants page
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getVariantsInUserShoppingCart(userId);
        const dataResult = data.Result.map(
          (variant) => variant.ProductVariantId
        );
        const productVariants = await getProductVariants();
        const filterProductVariants = productVariants.result.filter((variant) =>
          dataResult.includes(variant.productVariantId)
        );
        setShoppingCart(filterProductVariants);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const calculateTotalPrice = () => {
    const totalPrice = shoppingCart.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return totalPrice;
  };

  const incrementCount = (variant) => {
    if (count < variant.stockQuantity) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <h2 className="shopping-title">Shopping Cart</h2>
      </div>
      <div className="table-container">
        {shoppingCart.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shoppingCart.map((variant) => {
                return (
                  <tr>
                    <td>{variant.productVariantId}</td>
                    <td>{variant.productVariantName}</td>
                    <td>{variant.price}</td>
                    <td>  <div className="quantity">
            <button
              className="quantity-btn decrease-btn"
              onClick={decrementCount}
            >
              <FaChevronLeft />
            </button>
            <span> {count} </span>
            <button
              className="quantity-btn increase-btn"
              onClick={()=>incrementCount(variant)}
            >
              <FaChevronRight />
            </button>
          </div></td>
                    {/* <td>{variant.quantity}</td> */}
                    <td className="action-buttons">
                      <button
                        title="Delete From Shopping Cart"
                        className="delete-product-shoppingcart"
                        onClick={() => clearVariantfromShoppingCart(variant)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* Add more product rows as needed */}
            </tbody>
            <tfoot>
              <tr>
                <td className="td-special" colSpan="1"></td>
                <td className="total-price-label">Total Price:</td>
                <td colSpan="1" className="total-price-value">
                  {calculateTotalPrice()}$
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <h1 className="no-product">No products in the shopping cart</h1>
        )}
      </div>
      {shoppingCart.length > 0 && (
        <div>
          <div className="order-button">
            <button className="goto-order-btn" onClick={handleGoToClick}>
              <MdShoppingCartCheckout />
              Order
            </button>
          </div>
          <div className="deleteAll-button">
            <button
              className="delete-order-btn"
              onClick={() => clearShoppingCart(userId)}
            >
              <RiDeleteBin5Line />
              Delete All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
