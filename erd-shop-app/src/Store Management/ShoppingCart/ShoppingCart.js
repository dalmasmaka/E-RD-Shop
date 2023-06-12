import React from 'react'
import './ShoppingCartCss.css';
import { MdShoppingCartCheckout } from 'react-icons/md';
import {RiDeleteBin5Line} from 'react-icons/ri'
import {TiDeleteOutline} from 'react-icons/ti'
import { useNavigate } from 'react-router';

const ShoppingCart = () => {
    const navigate = useNavigate();
    // Fetch product variants based on the productId
    // You can make an API call or use any other method to fetch the variants
    const handleGoToClick = () => {
      navigate('/orderpage'); // Redirect to the product variants page
    };


  return (
    <div className="main-container">
    <div className="header-container">
        <h2 className='title'>Shopping Cart</h2>

    </div>
    <div className="table-container">
        <table>
            <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Store</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>

            </tr>
            <tr>
                <td>1</td>
                <td>
                    <p>produkti 1</p>
                </td>
                <td>Dior</td>
                <td>200$</td>
                <td>3</td>{/*ktu duhet me vendos numrin qe e zgjedhim te detajet e product variantit */}
                <td className='action-buttons'>
                  
                <button className='delete-product-shoppingcart'>   
                         <TiDeleteOutline />
                </button>
                </td>
            </tr>
        </table>
    </div>
    <div className='order-button'>
    <button className='goto-order-btn' onClick={handleGoToClick}><MdShoppingCartCheckout />Order</button>
    </div>
    <div className='deleteAll-button'>
    <button className='delete-order-btn'><RiDeleteBin5Line />Delete All</button>
    </div>
    
</div>
  )
}

export default ShoppingCart