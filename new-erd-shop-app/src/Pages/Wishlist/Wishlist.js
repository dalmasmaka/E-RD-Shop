import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "./Wishlist.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import {
  getProductVariants,
  getVariantsInUserWishlist,
  getVariantsInWishlist,
} from "../../API/Api";
import { BASE_URL } from "../../API/Api";
import { getUser } from "../../API/Api";

const Wishlist = () => {
  const params = useParams();
  const [wishlist, setWishlist] = useState([]);
  const history = useNavigate();
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

  const clearWishlist = () => {
    const url = `${BASE_URL}/WishlistManagement/${userId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
    };

  const clearVariant = async (variant) => {
    const url = `${BASE_URL}/WishlistManagement`;
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

  const taketoShoppingCart = (variant) => {
    console.log(userId)
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

  useEffect(() => {
    const fetchWishlist = async () => {
      try{
        const data = await getVariantsInUserWishlist(userId);
        console.log(data);
        const dataResult = data.Result.map(variant => variant.ProductVariantId);
        const productVariants = await getProductVariants();
        const filterProductVariants = productVariants.result.filter(variant => dataResult.includes(variant.productVariantId))
        setWishlist(filterProductVariants);
      }catch(error){
console.error(error);
      }
  };
    fetchWishlist();
  }, [userId]);

  return (
    <div className="main-container">
      <div className="header-container">
        <h2 className="wishlist-title">Wishlist</h2>
      </div>
      <div className="table-container">
      {wishlist.length > 0 ? (
        <table>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>

          {wishlist.map((variant) => {
            return (
              <tr>
                <td>{variant.productVariantId}</td>
                <td>{variant.productVariantName}</td>
                <td>{variant.price}</td>
                <td className="action-buttons">
                  <button title="Delete From Wishlist"
                    className="delete-product-shoppingcart"
                    onClick={() => clearVariant(variant)}
                  >
                    <TiDeleteOutline />
                  </button>
                  <button title="Take To Shopping Cart"
                    className="addto-order-btn"
                    onClick={() => taketoShoppingCart(variant)}
                  >
                    <MdShoppingCartCheckout />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
         ) : (
          <h1 className="no-product">No products in the wishlist</h1>
        )}
      </div>

      {wishlist.length > 0 && (
          <button
            className="delete-product-btn"
            onClick={() => clearWishlist(userId)}
          >
            <RiDeleteBin5Line />
            Delete All
          </button>
        )}
    </div>
  );
};

export default Wishlist;
