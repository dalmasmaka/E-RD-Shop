import React, { useState } from 'react';
import Sidebar from "../Components/Sidebar";
import Store from "../Store/Store";
import StoreForm from "../Store/StoreForm";
import Category from "../Category/Category";
import CategoryForm from "../Category/CategoryForm";
import Products from "../Products/Products";
import ProductForm from "../Products/ProductForm";
import ProductVariant from "../Product Variants/ProductVariant";
import ProductVariantForm from "../Product Variants/ProductVariantForm";
import Orders from "../Orders/Orders";
import OrderDetails from "../Orders/OrderDetails";
import ShippingMethods from '../Shipping Methods/ShippingMethods';
import Clients from '../Clients/Clients';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Store");

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "Store":
        return <Store onPageChange={handlePageChange} />;
      case "StoreForm":
        return <StoreForm />;
      case "Category":
        return <Category onPageChange={handlePageChange} />;
      case "CategoryForm":
        return <CategoryForm />;
      case "Products":
        return <Products onPageChange={handlePageChange} />;
      case "ProductForm":
        return <ProductForm />;
      case "ProductVariant":
        return <ProductVariant onPageChange={handlePageChange} />;
      case "ProductVariantForm":
        return <ProductVariantForm />;
      case "Orders":
        return <Orders onPageChange={handlePageChange} />;
      case "ShippingMethods":
        return <ShippingMethods />;
      case "OrderDetails":
        return <OrderDetails />;
      case "Clients":
        return <Clients/>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-content">
      <div className="sidebar">
        <Sidebar onPageChange={handlePageChange} />
      </div>
      <div className="pages">{renderPage()}</div>
    </div>
  );
};

export default Dashboard;