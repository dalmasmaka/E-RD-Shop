import React,{useEffect,useState} from 'react';
import './ShoppingCart.css';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../../API/Api';
import { getVariantsInShoppingCart } from '../../API/Api';
import { getUser } from '../../API/Api';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const testwishlist = [];

    const [shoppingCart, setShoppingCart] = useState([]);
    const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      const user = await getUser();
      setUserId(user.userId);
    }
    fetchUserId();
  }, [])

  const clearShoppingCart = (userId) => {
    const url = `${BASE_URL}/ShoppingCartManagement`
    const requestData = {
      userId: userId
    };
    fetch(url, {
      method:"DELETE",
      body: JSON.stringify(requestData),
      headers:{
        'Content-Type': "application/json"
      }
    })
    navigate.go(0)
  }
  const clearVariantfromShoppingCart = (variant) => {
    const url = `${BASE_URL}/ShoppingCartManagement`
    const requestData = {
        variant: variant
    };
    fetch(url, {
      method:"DELETE",
      body: JSON.stringify(requestData),
      headers:{
        'Content-Type': "application/json"
      }
    })
  }

  const handleGoToClick = () => {
    navigate('/orderpage'); // Redirect to the product variants page
  };



  const calculateTotalPrice = () => {
    const totalPrice = shoppingCart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return totalPrice;
  };

  return (
    <div className='main-container'>
      <div className='header-container'>
        <h2 className='shopping-title'>Shopping Cart</h2>
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
                    
          {testwishlist.map((variant) => {
          return(
            <tr>
              <td>{variant.id}</td>
              <td>{variant.name}</td>
              <td>{variant.store}</td>
              <td>{variant.price}</td>
              <td>{variant.quantity}</td>
              <td className='action-buttons'>
                <button className='delete-product-shoppingcart' onClick={() => clearVariantfromShoppingCart(variant)}>
                  <TiDeleteOutline />
                </button>
                </td>
            </tr>
          )
        })}
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
        <button className='delete-order-btn' onClick={() => clearShoppingCart(userId)}>
          <RiDeleteBin5Line />
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;