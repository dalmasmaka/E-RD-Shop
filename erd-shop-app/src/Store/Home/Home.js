import React from 'react'
import './HomeCss.css';
import Slider from '../Components/slider/Slider';
import Stores from '../Components/Stores/Stores';
import banner from '../Assets/img/mall.mp4'
import { Link } from 'react-router-dom';

 const Home = () => {
   return (
<div className='homepage'>
     <div className='banner'>
        <video src={banner} autoPlay loop muted />
       <Link className='banner-btn' to="/category">Buy Now</Link> 
     </div>
     <Stores />
     <Slider />
     </div>
   )
 }
 
 export default Home