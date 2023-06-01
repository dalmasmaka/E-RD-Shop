import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './HeaderCss.css'
import {AiOutlineSearch, AiOutlineHeart, AiOutlineShopping} from 'react-icons/ai';
import {BsPersonCircle} from 'react-icons/bs'
import logoPic from '../../Assets/img/logo.png'

const Header = () => {

  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const handleSearchBarClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <div className='header'>
        <div className='flex-between'>
            <div className='flex'>
              <img className='logo-img' src={logoPic} alt=''/>
                <Link className='nav-link' to="/home">Home</Link>
                <Link className='nav-link' to="/category">Category</Link>
                <Link className='nav-link' to="/contact">Contact</Link>
            </div>
            <div className='flex icon-div'>
           { /* isSearchBarOpen ?  <input className='search-input' type="text" placeholder="search"/> : ""*/}
            <button onClick={handleSearchBarClick} className='nav-link icon'><AiOutlineSearch /></button>
            <Link className='nav-link icon'  to="/wishlist"><AiOutlineHeart /></Link>
            <Link className='nav-link icon' to="/shoppingcart"> <AiOutlineShopping /></Link>
            <Link className='nav-link icon'> <BsPersonCircle /></Link>
            </div>
        </div>
    </div>
  )
}

export default Header
