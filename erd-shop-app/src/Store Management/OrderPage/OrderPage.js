import React, { useState, useEffect } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import './OrderPageCss.css';
import PaymentForm from '../OrderPage/PaymentForm/PaymentForm';

const OrderPage = () => {
  const [selectShippingMethod, setSelectShippingMethod] = useState('');
  const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
  const [countdown, setCountdown] = useState(null);

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
      <button className='submit-button-order' type='submit'>
        Submit
      </button>
    </div>
  );
};

export default OrderPage;
