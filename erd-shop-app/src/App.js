
import './App.css';
import { Login } from './Store/Login/Login';
import { Register } from './Store/Register/Register';
import { Route, Routes } from 'react-router';
import Home from './Store/Home/Home';
import Footer from './Store/Components/Footer/Footer';
import Header from './Store/Components/Header/Header';
import CategoryType from './Store/CategoryType/CategoryType';
import { Category } from './Store/Category/Category';
import Product from './Store/Product/Product';
import ProductVariants from './Store/ProductVariant/ProductVariants';
import ProductVariantDetails from './Store/Details/ProductVariantDetails';
import Dashboard from './Store Management/Dashboard/Dashboard';
import Store from './Store Management/Store/Store';
import StoreForm from './Store Management/Store/StoreForm';
import CategoryForm from './Store Management/Category/CategoryForm';
import Products from './Store Management/Products/Products';
import ProductVariant from './Store Management/Product Variants/ProductVariant';
import ProductVariantForm from './Store Management/Product Variants/ProductVariantForm';
import Orders from './Store Management/Orders/Orders';
import OrderDetails from './Store Management/Orders/OrderDetails'
import Clients from './Store Management/Clients/Clients';
import ShoppingCart from './Store Management/ShoppingCart/ShoppingCart';
import Wishlist from './Store Management/Wishlist/Wishlist';
import OrderPage from './Store Management/OrderPage/OrderPage';
import PaymentForm from './Store Management/OrderPage/PaymentForm/PaymentForm';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category-type" element={<CategoryType />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id" element={<Product />} />
        <Route path="/products/:id" element={<ProductVariants />} />
        <Route path="/productvariants/:id" element={<ProductVariantDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stores" element={<Store />} />
        <Route path='/createstore' element={<StoreForm />} />
        <Route path='/category' element={<Category />} />
        <Route path='/createcategory' element={<CategoryForm />} />
        <Route path='/products' element={<Products />} />
        <Route path='/productvariants' element={<ProductVariant />} />
        <Route path='/createproductvariant' element={<ProductVariantForm />} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/details' element={<OrderDetails/>} />
        <Route path='/clients' element={<Clients/>} /> 
        <Route path='/shoppingcart' element={<ShoppingCart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/orderpage' element={<OrderPage />} />
        <Route path='/paymentform' element={<PaymentForm />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
