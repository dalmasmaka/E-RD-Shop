import "./App.css";
import { Login } from "./Store/Login/Login";
import { Register } from "./Store/Register/Register";
import { Route, Routes, useLocation } from "react-router";
import Home from "./Store/Home/Home";
import Footer from "./Store/Components/Footer/Footer";
import Header from "./Store/Components/Header/Header";
import CategoryType from "./Store/CategoryType/CategoryType";
import { Category } from "./Store/Category/Category";
import Product from "./Store/Product/Product";
import ProductVariants from "./Store/ProductVariant/ProductVariants";
import ProductVariantDetails from "./Store/Details/ProductVariantDetails";
import Dashboard from "./Store Management/Dashboard/Dashboard";
import ShoppingCart from "./Store Management/ShoppingCart/ShoppingCart";
import Wishlist from "./Store Management/Wishlist/Wishlist";
import OrderPage from "./Store Management/OrderPage/OrderPage";
import PaymentForm from "./Store Management/OrderPage/PaymentForm/PaymentForm";
import { RegisterStorekeeper } from "./Store/RegisterStorekeeper/RegisterStorekeeper";
import { useState, useEffect } from "react";
import Loader from "./Store Management/Components/Loader";
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [location]);
  return (
    <div>
      {loading ? ( <Loader/> ) : (
          <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category-type" element={<CategoryType />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:id" element={<Product />} />
            <Route path="/products/:id" element={<ProductVariants />} />
            <Route
              path="/productvariants/:id"
              element={<ProductVariantDetails />}
            />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route path="/registerstorekeeper" element={<RegisterStorekeeper />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
