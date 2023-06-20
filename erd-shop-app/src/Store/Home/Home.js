import React,{useState,useEffect} from 'react'
import './HomeCss.css';
import Slider from '../Components/slider/Slider';
import Stores from '../Components/Stores/Stores';
import banner from '../Assets/img/mall.mp4'
import { Link } from 'react-router-dom';
import imazh from '../../Assets/img/mac.png'
import { getStores } from '../../API/api';

 const Home = () => {

  const [stores,setStores] = useState([]);

  useEffect(() => {
    getStores()
      .then((data) => setStores(data.result))
      .catch((error) => console.error("Error: ", error));
  }, []);
   return (
<div className='homepage'>
     <div className='banner'>
        <video src={banner} autoPlay loop muted />
       <Link className='banner-btn' to="/category">Buy Now</Link> 
     </div>
     <div className='take-to-category-laptop'>
      <div className='take-to-text'>
        <h2 className='take-to-title'>All you need is here!</h2>
        <p className='take-to-info'>If you're looking to invest for yourself, look no further than the products we offer.</p> </div>
      <div className='take-to-img'>
        <img className='img-take-to' alt='' src={imazh} />
      </div>
     </div>
     <h1 className='our-stores'>Our Brands</h1>
     <div className='all-stores'>
     {stores.map((store) => {
              return (
                <Stores
                  id={store.storeId}
                  name={store.storeName}
                  image={store.storeImg}
                />
              );
            }
          )}
     </div>
     <Slider />
     </div>
   )
 }
 
 export default Home