import React, { useState, useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import "./OrderPage.css";
import PaymentForm from "../OrderPage/PaymentForm/PaymentForm";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../API/Api";

const OrderPage = (props) => {
  const [selectShippingMethod, setSelectShippingMethod] = useState("");
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectPaymentMethod !== "option5") {
      const randomNumber = Math.floor(Math.random() * 23) + 7; // Generates a random number between 1 and 10

      let startNumber = 50;
      const countdownInterval = setInterval(() => {
        startNumber--;
        setCountdown(startNumber);
        if (startNumber === randomNumber) {
          clearInterval(countdownInterval);
        }
      }, 50);

      return () => clearInterval(countdownInterval);
    }
  }, [selectPaymentMethod]);
  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }
  }, []);

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

  useEffect(() => {
    var tempArray = [];
    props.products.map((product) => {
      if (product.quantity > 1) {
        for (let i = 0; i < product.quantity; i++) {
          tempArray.push(product);
        }
      } else {
        tempArray.push(product);
      }
    });
    setShoppingCart(tempArray);
  }, [props]);

  const calculateTotalPrice = () => {
    const total = shoppingCart.reduce((total, product) => {
      return total + product.price;
    }, 0);

    return total;
  };

  const handleOrder = async () => {
    const totalPrice = calculateTotalPrice();
    const orderObject = {
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      userId: userId,
      productVariants: shoppingCart,
    };
    if (shippingAddress === "") {
      return;
    }
    const result = await postOrder(orderObject);
    console.log(result);
  };

  return (
    <div className="background-container">
      <div className="order-modal">
        <div className="order-page">
          <h1 className="order-title">Complete your Order</h1>
          <div className="order-container">
            <div className="flex-order-left">
              <div className="input-text-order">
                <p className="enter-bill-address">Shipping address:</p>{" "}
                <input
                  className="order-address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>
              <div className="shipping-method">
                <p className="shipping-method-select">
                  <FaShippingFast />
                  <select
                    className="shipp-select"
                    value={selectShippingMethod}
                    onChange={(e) => setSelectShippingMethod(e.target.value)}
                  >
                    <option value="option0">Shipping Method</option>
                    <option value="option1">By Ship</option>
                    <option value="option2">By Airplane</option>
                    <option value="option3">By Car</option>
                  </select>
                </p>
              </div>
              <div className="payment-method">
                <p className="payment-method-select">
                  <MdPayment />
                  <select
                    className="pay-select"
                    value={selectPaymentMethod}
                    onChange={(e) => setSelectPaymentMethod(e.target.value)}
                  >
                    <option value="option3">Payment Method</option>
                    <option value="option4">Cash</option>
                    <option value="option5">Card</option>
                  </select>
                </p>
              </div>
            </div>
            <div className="flex-order-right">
              {selectPaymentMethod === "option5" ? (
                <PaymentForm />
              ) : (
                <div className="arrival">
                  <h1 className="arrival-info">
                    Your order will arrive in
                    <h1 className="arrival-info">{countdown}</h1>
                    <h1 className="arrival-info">days</h1>
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="table-container order">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {shoppingCart.map((variant) => {
                  return (
                    <tr>
                      <td>{variant.productVariantName}</td>
                      <td>{variant.price}$</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1"></td>
                  <td colSpan="1" className="total-price-value">
                    {calculateTotalPrice()}$
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="button-container">
            <button
              className="submit-button-order"
              type="submit"
              onClick={handleOrder}
            >
              Order
            </button>
            <button
              className="cancel-button-order"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
