import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import  "./Components.css"
import Store from "../Pages/Store";
import Category from "../Pages/Category";
import Product from "../Pages/Product";
import ProductVariant from "../Pages/ProductVariant";
import Order from "../Pages/Order";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="sidebar-pages-container">
        <Routes>
          <Route path="store" element={<Store />} />
          <Route path='category' element={<Category/>} />
          <Route path='product' element={<Product/>} />
          <Route path='productvariant' element={<ProductVariant/>} />
          <Route path='order' element={<Order/>}/>
        </Routes>
      </div>
    </div>
  );
}
