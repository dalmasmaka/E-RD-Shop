import './App.css';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header'
import Category from './Pages/Category/Category';
import Footer from './Pages/Footer/Footer';
import Product from './Pages/Product/Product';
import ProductVariants from './Pages/ProductVariant/ProductVariants';
import ProductVariantDetails from './Pages/ProductVariantDetails/ProductVariantDetails';
import Wishlist from './Pages/Wishlist/Wishlist';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';
import OrderPage from './Pages/OrderPage/OrderPage';
import PaymentForm from './Pages/OrderPage/PaymentForm/PaymentForm';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/category/:id" element={<Product />} />
          <Route path="/products/:id" element={<ProductVariants />} />
          <Route
              path="/productvariants/:id"
              element={<ProductVariantDetails />}
            />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/shoppingcart" element={<ShoppingCart />} />
               <Route path="/orderpage" element={<OrderPage />} />
               <Route path="/paymentform" element={<PaymentForm />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
