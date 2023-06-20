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
import Users from '../Users/Users';
import UserForm from '../Users/UserForm';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Store");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle page change
  const handlePageChange = (page, store = null, category = null, product = null, productVariant = null, user=null) => {
    if (store) {
      setSelectedStore(store);
      setSelectedCategory(null);
      setSelectedProduct(null);
      setSelectedProductVariant(null);
      setSelectedUser(null);
    } else if (category) {
      setSelectedCategory(category);
      setSelectedStore(null);
      setSelectedProduct(null);
      setSelectedProductVariant(null);
      setSelectedUser(null);
    }
    else if(product){
      setSelectedCategory(null);
      setSelectedStore(null);
      setSelectedProduct(product);
      setSelectedProductVariant(null);
      setSelectedUser(null);
    }
    else if(productVariant){
      setSelectedCategory(null);
      setSelectedStore(null);
      setSelectedProduct(null);
      setSelectedProductVariant(productVariant);
      setSelectedUser(null);
    }
    else if(user){
      setSelectedCategory(null);
      setSelectedStore(null);
      setSelectedProduct(null);
      setSelectedProductVariant(null);
      setSelectedUser(user);
    }

    setCurrentPage(page);
  };
  
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
        return <ProductForm  onPageChange={handlePageChange} selectedProduct={selectedProduct}/>;
      case "ProductVariant":
        return <ProductVariant onPageChange={handlePageChange} onEdit={handlePageChange}/>;
      case "ProductVariantForm":
        return <ProductVariantForm onPageChange={handlePageChange} selectedProductVariant={selectedProductVariant} selectedProduct={selectedProduct}/>;
      case "Orders":
        return <Orders onPageChange={handlePageChange} onEdit={handlePageChange}/>;
      case "OrderDetails":
        return <OrderDetails onPageChange={handlePageChange} />;
      case "Users":
        return <Users onPageChange={handlePageChange} onInfo={handlePageChange}/>;
      case "UserForm":
        return <UserForm onPageChange={handlePageChange} selectedUser={selectedUser}/>;
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
