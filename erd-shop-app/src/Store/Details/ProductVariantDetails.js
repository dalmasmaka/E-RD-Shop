import React,{useState} from 'react'
import iphone1 from '../Assets/img/iphone14.png'
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'
import './ProductVariantDetailsCss.css'
import { AiOutlineHeart,AiOutlineShopping,AiFillHeart,AiTwotoneShopping, AiFillShopping} from 'react-icons/ai'

const ProductVariantDetails = () => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isCartFilled, setIsCartFilled] = useState(false);
    const [count, setCount] = useState(0);


    const handleGoToClickWishlist = () => {
      setIsHeartFilled(!isHeartFilled);
    };

    const handleGoToClickCart = () => {
      setIsCartFilled(!isCartFilled);
    };

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrementCount = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
          }
            };
    
  return (
    <div className='container'>
        <div className='leftDiv'>
            <img alt='' src={iphone1}></img>
        </div>
        <div className='rightDiv'>
            <h2 className='variant-title'>Title</h2>
            <h4 className='variant-price'>Price:<span className='product-price'> 300$</span></h4>
            <p className='variant-category'>Category:<span className='category-type'> Iphone</span></p>
            <p className='variant-store'>Store:<span className='store-type'> Apple</span></p> 
            <div className='quantity'>
				<button className='quantity-btn decrease-btn' onClick={decrementCount}>
					<FaChevronLeft/>
				</button>
				<span> {count} </span>
				<button className='quantity-btn increase-btn' onClick={incrementCount}>
					<FaChevronRight/>
				</button>
			</div>
            <button className='btn-flex-details btn-wishlist-details' onClick={handleGoToClickWishlist}>{isHeartFilled ? <AiFillHeart /> : <AiOutlineHeart />}</button>
          <button className='btn-flex-details btn-shopping-details' onClick={handleGoToClickCart}>{isCartFilled ? <AiTwotoneShopping /> : <AiOutlineShopping />}</button>         
        </div>
    </div>
  )
}

export default ProductVariantDetails