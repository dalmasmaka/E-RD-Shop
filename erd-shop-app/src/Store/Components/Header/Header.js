import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './HeaderCss.css'
import {AiOutlineSearch, AiOutlineHeart, AiOutlineShopping} from 'react-icons/ai';
import {BiMenu} from 'react-icons/bi';
import {FaTimes} from 'react-icons/fa';
import {BsPersonCircle} from 'react-icons/bs'
import logoPic from '../../Assets/img/logo.png'

const Header = () => {

  const [isMobile, setIsMobile] = useState(false);
  

  return (
    <div className='header'>
        <div className='flex-between'>
            <div className='flex'>
              <img className='logo-img' src={logoPic} alt=''/>
              {isMobile ? (
                  <div className='nav-links-mobile'>
                  <Link className='nav-link' to="/home">Home</Link>
                  <Link className='nav-link' to="/category">Category</Link>
                  <Link className='nav-link' to="/contact">Contact</Link>
                  <Link className='nav-link' to="/dashboard">Dashboard</Link>
                <div className='div-mobile'>
                  <Link className='nav-link icon'  to="/wishlist"><AiOutlineHeart /></Link>
                  <Link className='nav-link icon' to="/shoppingcart"> <AiOutlineShopping /></Link>
                  <Link className='nav-link icon'> <BsPersonCircle /></Link>
                </div>
                  </div>
              ) : (
               <></>
              )}
               <div className='nav-links-desktop'>
                  <Link className='nav-link' to="/home">Home</Link>
                  <Link className='nav-link' to="/category">Category</Link>
                  <Link className='nav-link' to="/contact">Contact</Link>
                  <Link className='nav-link' to="/dashboard">Dashboard</Link>
                  <button className='nav-link icon'><AiOutlineSearch /></button>
                  <Link className='nav-link icon'  to="/wishlist"><AiOutlineHeart /></Link>
                  <Link className='nav-link icon' to="/shoppingcart"> <AiOutlineShopping /></Link>
                  <Link className='nav-link icon'> <BsPersonCircle /></Link>
                </div>
            
            </div>
           { /* isSearchBarOpen ?  <input className='search-input' type="text" placeholder="search"/> : ""*/}
           
            <button className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
              {isMobile ? (<FaTimes/>) :(<BiMenu  />)}
            </button>
            </div>
            
        </div>
  )
}

export default Header
