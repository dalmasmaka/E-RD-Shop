import React, {useState} from 'react';
import './App.css';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { Route, Router, Routes } from 'react-router';
import Home from './Home/Home';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import CategoryType from './CategoryType/CategoryType';
import { Category } from './Category/Category';
import Product from './Product/Product';
import ProductVariants from './ProductVariant/ProductVariants';
import ProductVariantDetails from './Details/ProductVariantDetails';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import Wishlist from './Wishlist/Wishlist';

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category-type" element={<CategoryType />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id" element={<Product />} />
        <Route path="/products/:id" element={<ProductVariants />} />
        <Route path="/productvariants/:id" element={<ProductVariantDetails />} />
        <Route path='/shoppingcart' element={<ShoppingCart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        


        {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
