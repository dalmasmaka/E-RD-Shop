import React from 'react'
import CategoryType from '../CategoryType/CategoryType';
import iphone from '../Assets/img/iphone.png'
import './CategoryCss.css';

export const Category = () => {
  return (
    <div className='category'>
        <h1 className='category-title'>Category</h1>
        <div className='category-products'>
            <CategoryType 
                id="123"
                name = "Phones"
                image={iphone}
            />
            <CategoryType 
                id="124"
                name = "Product 2"
                image={iphone}
            />
            <CategoryType 
                id="125"
                name = "Product 3"
                image={iphone}
            />
            <CategoryType 
                id="126"
                name = "CategoryType 4"
                image={iphone}
            />
            <CategoryType 
                id="123"
                name = "CategoryType 1"
                image={iphone}
            />
            <CategoryType 
                id="123"
                name = "CategoryType 1"
                image={iphone}
            />
            <CategoryType 
                id="123"
                name = "CategoryType 1"
                image={iphone}
            />
    </div>
    </div>
  )
}
