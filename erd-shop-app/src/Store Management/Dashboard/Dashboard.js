import React, { useState } from 'react';
import Sidebar from "../Components/Sidebar";
import Store from "../Store/Store";
import StoreForm from "../Store/StoreForm";
import { useRoutes } from 'react-router-dom';
import CategoryForm from "../Category/CategoryForm";
import Products from "../Products/Products";
import ProductForm from "../Products/ProductForm";
import ProductVariant from "../Product Variants/ProductVariant";
import ProductVariantForm from "../Product Variants/ProductVariantForm";
import Orders from "../Orders/Orders";
import OrderDetails from "../Orders/OrderDetails";
import Users from '../Users/Users';
import UserForm from '../Users/UserForm';
import { useNavigate } from 'react-router-dom';
import Categories from '../Category/Categories';

const Dashboard = () => {
  const navigate = useNavigate();
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
    navigate(page);
  };
  const routes = useRoutes([
    { path: 'dashboard/stores', element: <Store onPageChange={handlePageChange} onEdit={handlePageChange} /> },
    { path: 'dashboard/storeform', element: <StoreForm onPageChange={handlePageChange} selectedStore={selectedStore} /> },
    { path: 'dashboard/categories', element: <Categories onPageChange={handlePageChange} onEdit={handlePageChange} /> },
    { path: 'dashboard/categoryform', element: <CategoryForm onPageChange={handlePageChange} selectedCategory={selectedCategory} /> },
    { path: 'dashboard/products', element: <Products onPageChange={handlePageChange} onEdit={handlePageChange} /> },
    { path: 'dashboard/productform', element: <ProductForm onPageChange={handlePageChange} selectedProduct={selectedProduct} /> },
    { path: 'dashboard/productvariants', element: <ProductVariant onPageChange={handlePageChange} onEdit={handlePageChange} /> },
    { path: 'dashboard/productvariantform', element: <ProductVariantForm onPageChange={handlePageChange} selectedProductVariant={selectedProductVariant} selectedProduct={selectedProduct} /> },
    { path: 'dashboard/orders', element: <Orders onPageChange={handlePageChange} onEdit={handlePageChange} /> },
    { path: 'dashboard/orderdetails', element: <OrderDetails onPageChange={handlePageChange} /> },
    { path: 'dashboard/users', element: <Users onPageChange={handlePageChange} onInfo={handlePageChange} /> },
    { path: 'dashboard/userdetails', element: <UserForm onPageChange={handlePageChange} selectedUser={selectedUser} /> },
  ]);

  return (
    <div className="dashboard-content">
      <div className="sidebar">
        <Sidebar onPageChange={handlePageChange} />
      </div>
      <div className="pages">
     {routes}
      </div>
    </div>
  );
};

export default Dashboard;
