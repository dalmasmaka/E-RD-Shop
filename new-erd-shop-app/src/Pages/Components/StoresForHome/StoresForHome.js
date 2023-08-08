import React, { useState,useEffect } from 'react'
import './StoresForHome.css';

const StoresForHome = ({ id, name, image}) => {

  return (
    <div className='stores-image'>
         <img className='stores-img' alt='' src={image} />
      <div className='stores-info'>
      </div>
    </div>
  )
}

export default StoresForHome