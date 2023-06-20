import React, { useState, useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import './OrderPageCss.css';
import PaymentForm from '../OrderPage/PaymentForm/PaymentForm';

const OrderPage = () => {
  const [selectShippingMethod, setSelectShippingMethod] = useState('');
  const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const testwishlist = [];

  useEffect(() => {
    if (selectPaymentMethod !== 'option5') {
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 10

      let startNumber = 100;
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

  const handleClick = () => {
    setShowImage(true);
  };
  const calculateTotalPrice = () => {
    const totalPrice = shoppingCart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return totalPrice;
  };

  return (
    <div className='order-page'>
      <h1 className='order-title'>Complete your Order</h1>
      <div className='order-container'>
        <div className='flex-order-left'>
          <div className='input-text-order'>
            <p className='enter-bill-address'>Shipping address:</p>{' '}
            <input className='order-address' />
          </div>
          <div className='shipping-method'>
            <p className='shipping-method-select'>
              <FaShippingFast />
              <select
                className='shipp-select'
                value={selectShippingMethod}
                onChange={(e) => setSelectShippingMethod(e.target.value)}
              >
                <option value='option0'>Shipping Method</option>
                <option value='option1'>By Ship</option>
                <option value='option2'>By Airplane</option>
                <option value='option3'>By Car</option>
              </select>
            </p>
          </div>
          <div className='payment-method'>
            <p className='payment-method-select'>
              <MdPayment />
              <select
                className='pay-select'
                value={selectPaymentMethod}
                onChange={(e) => setSelectPaymentMethod(e.target.value)}
              >
                <option value='option3'>Payment Method</option>
                <option value='option4'>Cash</option>
                <option value='option5'>Card</option>
              </select>
            </p>
          </div>
        </div>
        <div className='flex-order-right'>
          {selectPaymentMethod === 'option5' ? (
            <PaymentForm />
          ) : (
            <div className='arrival'>
              <h1 className='arrival-info'>
                Your order will arrive in 
                <h1 className='arrival-info'>{countdown}</h1>
                <h1 className='arrival-info'>days</h1> 
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className='table-container order'>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
                    
          {testwishlist.map((variant) => {
          return(
            <tr>
              <td>{variant.name}</td>
              <td>{variant.quantity}</td>
              <td>{variant.price}</td>
            </tr>
          )
        })}
            {/* Add more product rows as needed */}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='1'></td>
              <td className='total-price-label'>Total Price:</td>
              <td colSpan='1' className='total-price-value'>
                {calculateTotalPrice()}$
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button className='submit-button-order' type='submit' onClick={handleClick}>
        {showImage ? (
          <img
            className='submit-finished'
            src='https://i.cloudup.com/2ZAX3hVsBE-3000x3000.png'
            height='30'
            width='30'
            alt='Finished'
          />
        ) : (
          <span>Submit</span>
        )}
      </button>
    </div>
  );
};

export default OrderPage;
