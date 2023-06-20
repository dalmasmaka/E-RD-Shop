import React, { useState,useEffect } from 'react'
import './StoresCss.css';

const Stores = ({ id, name, image}) => {

  return (
    <div className='stores-image'>
         <img className='stores-img' alt='' src={image} />
      <div className='stores-info'>
        <p className='stores-name'>{name}</p>
      </div>
    </div>
  )
}

export default Stores