import React from 'react'
import './StoresCss.css';
import chanel from '../../Assets/img/chanel.png';
import louis from '../../Assets/img/louis.png';
import addidas from '../../Assets/img/addidas.png';
import gucci from '../../Assets/img/gucci.png';

const Stores = () => {
  return (
    <div className='stores-image'>
        <img alt="" src={chanel} className='img-store'/>
        <img alt="" src={louis} className='img-store'/>
        <img alt="" src={addidas} className='img-store'/>
        <img alt="" src={gucci} className='img-store'/>
    </div>
  )
}

export default Stores