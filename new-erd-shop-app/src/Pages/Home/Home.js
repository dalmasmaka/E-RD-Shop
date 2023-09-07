import React, { useState, useEffect } from "react";
import "./Home.css";
import Slider from "../Components/Slider/Slider";
/*import Stores from '../Components/Stores/Stores';*/
import banner from "../../Assets/img/mall.mp4";
import { Link } from "react-router-dom";
import imazh from "../../Assets/img/mac.png";
import { getStores } from "../../API/Api";
import { getCategories } from "../../API/Api";
import StoresForHome from "../Components/StoresForHome/StoresForHome";
import CategoryForHome from "../Components/CategoryForHome/CategoryForHome";

const Home = () => {
  const [stores, setStores] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getStores()
      .then((data) => setStores(data.result))
      .catch((error) => console.error("Error: ", error));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategory(data.result))
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <div className="homepage">
      <div className="banner">
        <video src={banner} autoPlay loop muted />
        <Link className="banner-btn" to="/category">
          Buy Now
        </Link>
      </div>
      <div className="take-to-category-laptop">
        <div className="take-to-text">
          <h2 className="take-to-title">All you need is here!</h2>
          <p className="take-to-info">
            If you're looking to invest for yourself, look no further than the
            products we offer.
          </p>{" "}
        </div>
        <div className="take-to-img">
          <img className="img-take-to" alt="" src={imazh} />
        </div>
      </div>
      {/* <h1 className='our-stores'>Our Brands</h1> */}
      <div className="div-store">
        <div className="all-store">
          <h1 className="store-home">Our Brands</h1>
          <p className="store-text">
            With an extensive collection of renowned national and international
            brands, we offer an unparalleled shopping experience that caters to
            every taste, style, and budget.
          </p>
          <div className="all-stores">
            {stores.map((store) => {
              return (
                <StoresForHome
                  id={store.storeId}
                  name={store.storeName}
                  image={store.storeImg}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="div-category">
        <div className="all-category">
          <div className="all-categories">
            {category.map((category) => {
              return (
                <CategoryForHome
                  id={category.categoryId}
                  name={category.categoryName}
                  image={category.categoryImg}
                />
              );
            })}
          </div>
          <div className="categ-text">
            <h1 className="category-home">Our Collections</h1>
            <p className="category-text">
              With an extensive collection of renowned national and
              international brands, we offer an unparalleled shopping experience
              that caters to every taste, style, and budget.
            </p>
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
};

export default Home;
