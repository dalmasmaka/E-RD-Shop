import React, {useState} from 'react'
import {FaShippingFast} from 'react-icons/fa'
import {MdPayment} from 'react-icons/md'
import './OrderPageCss.css'
import PaymentForm from '../OrderPage/PaymentForm/PaymentForm';



const OrderPage = () => {
    const [selectShippingMethod, setSelectShippingMethod] = useState(''); 
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(''); 

  return (
    <div className='order-page'>
        <h1 className='order-title'>Complete your Order</h1>
        <div className='order-container'>
            <div className='flex-order-left'>
                <div className='input-text-order'> <p className='enter-bill-address'>Shipping address:</p> <input className='order-address' /></div>
                <div className="shipping-method">
               <p className='shipping-method-select'><FaShippingFast />
                <select className='shipp-select' value={selectShippingMethod} onChange={(e) => setSelectShippingMethod(e.target.value)}>
                    <option value="option0">Shipping Method</option>
                    <option value="option1">By Ship</option>
                    <option value="option2">By Airplane</option>
                    <option value="option3">By Car</option>
                </select>
                </p> 
                </div>
                <div className="payment-method">
               <p className='payment-method-select'><MdPayment />
                <select className='pay-select' value={selectPaymentMethod} onChange={(e) => setSelectPaymentMethod(e.target.value)}>
                    <option value="option3">Payment Method</option>
                    <option value="option4">Cash</option>
                    <option value="option5">Card</option>
                </select>
                </p> 
                </div>
            </div>
            <div className='flex-order-right'>
                <PaymentForm/>
            </div>
        </div>
    </div>
    
  )
}

export default OrderPage