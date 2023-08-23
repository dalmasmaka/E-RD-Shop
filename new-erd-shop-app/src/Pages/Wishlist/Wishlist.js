import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Wishlist.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { getVariantsInUserWishlist } from "../../API/Api";
import { BASE_URL } from "../../API/Api";
import { getUser } from "../../API/Api";

const Wishlist = () => {
  const testwishlist = [];

  const [wishlist, setWishlist] = useState([]);
  const history = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getUser();
      setUserId(user.userId);
    };
    fetchUserId();
  }, []);

  const clearWishlist = (userId) => {
    const url = `${BASE_URL}/WishlistManagement`;
    const requestData = {
      userId: userId,
    };
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    history.go(0);
  };
  const clearVariant = (variant) => {
    const url = `${BASE_URL}/WishlistManagement`;
    const requestData = {
      variant: variant,
    };
    fetch(url, {
      method: "DELETE",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const taketoShoppingCart = (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`;
    const requestData = {
      variant: variant,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getVariantsInUserWishlist("goeiasngfsiondf");
      setWishlist(data);
    };
    fetchWishlist();
  }, []);

  return (
    <div className="main-container">
      <div className="header-container">
        <h2 className="wishlist-title">Wishlist</h2>
      </div>
      <div className="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Store</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>

          {testwishlist.map((variant) => {
            return (
              <tr>
                <td>{variant.id}</td>
                <td>{variant.name}</td>
                <td>{variant.store}</td>
                <td>{variant.price}</td>
                <td className="action-buttons">
                  <button
                    className="delete-product-shoppingcart"
                    onClick={() => clearVariant(variant)}
                  >
                    <TiDeleteOutline />
                  </button>
                  <button
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
      </div>

      <div className="deleteAll-button">
        <button
          className="delete-product-btn"
          onClick={() => clearWishlist(userId)}
        >
          <RiDeleteBin5Line />
          Delete All
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
