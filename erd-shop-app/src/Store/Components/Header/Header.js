import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderCss.css';
import { AiOutlineHeart, AiOutlineShopping } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import logoPic from '../../Assets/img/logo.png';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false); // State to track if logout button should be shown

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Email');
    navigate('/login');
    // You can redirect to a login page or perform any necessary actions
  };

  return (
    <div className='header'>
      <div className='flex-between'>
        <div className='flex'>
          <img className='logo-img' src={logoPic} alt='' />
          {isMobile ? (
            <div className='nav-links-mobile'>
              <Link className='nav-link' to='/home'>
                Home
              </Link>
              <Link className='nav-link' to='/category'>
                Category
              </Link>
              <Link className='nav-link' to='/dashboard'>
                Dashboard
              </Link>
              <div className='div-mobile'>
                <Link className='nav-link icon' to='/wishlist'>
                  <AiOutlineHeart />
                </Link>
                <Link className='nav-link icon' to='/shoppingcart'>
                  <AiOutlineShopping />
                </Link>
                {/* Conditionally render either the logout button or the BsPersonCircle icon */}
                {localStorage.getItem('Token')!=null && localStorage.getItem('Email')!=null ? (
                  <button className='nav-link icon' onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link
                    className='nav-link icon'
                    onClick={() => setShowLogout(true)}
                  >
                    <BsPersonCircle />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className='nav-links-desktop'>
            <Link className='nav-link' to='/home'>
              Home
            </Link>
            <Link className='nav-link' to='/category'>
              Category
            </Link>
            <Link className='nav-link' to='/dashboard'>
              Dashboard
            </Link>
            <Link className='nav-link icon' to='/wishlist'>
              <AiOutlineHeart />
            </Link>
            <Link className='nav-link icon' to='/shoppingcart'>
              <AiOutlineShopping />
            </Link>
            {/* Conditionally render either the logout button or the BsPersonCircle icon */}
            {showLogout ? (
              <button className='nav-link icon logout'  onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link
                className='nav-link icon'
                onClick={() => setShowLogout(true)}
              >
                <BsPersonCircle />
              </Link>
            )}
          </div>
        </div>
        {/* isSearchBarOpen ?  <input className='search-input' type="text" placeholder="search"/> : ""*/}
        <button className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FaTimes /> : <BiMenu />}
        </button>
      </div>
    </div>
  );
};

export default Header;
