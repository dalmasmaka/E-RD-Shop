import React, { useState,useEffect } from 'react'
import './CategoryForHome.css';

const CategoryForHome = ({ id, name, image}) => {

  return (
    <div className='category-image'>
         <img className='category-img' alt='' src={image} />
      <div className='category-info'>
      </div>
    </div>
  )
}

export default CategoryForHome