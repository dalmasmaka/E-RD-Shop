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
import Clients from '../Clients/Clients';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Store");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);

  // Function to handle page change
  const handlePageChange = (page, store = null, category = null) => {
    debugger
    if (store) {
      setSelectedStore(store);
      setSelectedCategory(null);
    } else if (category) {
      setSelectedCategory(category);
      setSelectedStore(null);
    }
    setCurrentPage(page);
  };
  

  // Function to render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "Store":
        return <Store onPageChange={handlePageChange} onEdit={handlePageChange} />;
      case "StoreForm":
        return <StoreForm onPageChange={handlePageChange}  selectedStore={selectedStore}/>;
      case "Category":
        return <Category onPageChange={handlePageChange} onEdit={handlePageChange} />;
      case "CategoryForm":
        return <CategoryForm  onPageChange={handlePageChange} selectedCategory={selectedCategory}/>;
      case "Products":
        return <Products onPageChange={handlePageChange} onEdit={handlePageChange}/>;
      case "ProductForm":
        return <ProductForm  onPageChange={handlePageChange} selectedCategory={selectedProduct}/>;
      case "ProductVariant":
        return <ProductVariant onPageChange={handlePageChange} onEdit={handlePageChange}/>;
      case "ProductVariantForm":
        return <ProductVariantForm onPageChange={handlePageChange} selectedProductVariant={selectedProductVariant} />;
      case "Orders":
        return <Orders onPageChange={handlePageChange} onEdit={handlePageChange}/>;
      case "OrderDetails":
        return <OrderDetails onPageChange={handlePageChange} />;
      case "Clients":
        return <Clients />;
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
