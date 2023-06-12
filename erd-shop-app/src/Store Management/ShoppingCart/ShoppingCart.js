import React from 'react';
import './ShoppingCartCss.css';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router';

const ShoppingCart = () => {
  const navigate = useNavigate();
  // Fetch product variants based on the productId
  // You can make an API call or use any other method to fetch the variants
  const handleGoToClick = () => {
    navigate('/orderpage'); // Redirect to the product variants page
  };

  // Calculate the total price of all products
  const calculateTotalPrice = () => {
    // Replace this sample data with the actual logic to calculate the total price
    const products = [
      { id: 1, name: 'produkti 1', store: 'Dior', price: 200, quantity: 3 },

      // Add more products as needed
    ];

    const totalPrice = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return totalPrice;
  };

  return (
    <div className='main-container'>
      <div className='header-container'>
        <h2 className='title'>Shopping Cart</h2>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Store</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <p>produkti 1</p>
              </td>
              <td>Dior</td>
              <td>200$</td>
              <td>3</td>
              <td className='action-buttons'>
                <button className='delete-product-shoppingcart'>
                  <TiDeleteOutline />
                </button>
              </td>
            </tr>
            {/* Add more product rows as needed */}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='3'></td>
              <td className='total-price-label'>Total Price:</td>
              <td colSpan='2' className='total-price-value'>
                {calculateTotalPrice()}$
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className='order-button'>
        <button className='goto-order-btn' onClick={handleGoToClick}>
          <MdShoppingCartCheckout />
          Order
        </button>
      </div>
      <div className='deleteAll-button'>
        <button className='delete-order-btn'>
          <RiDeleteBin5Line />
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
