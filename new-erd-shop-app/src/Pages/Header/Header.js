import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import logoPic from "../../Assets/img/logo.png";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import { getStores } from "../../API/Api";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [params, setParams] = useState('');
  const [stores, setStores] = useState([]);
  function parseJwt(token) {
    try {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getStores()
      .then((data) => {
        setStores(data.result);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });


    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      //we get the role og the logged in user
      setUserRole(
        userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
      //we get the id of the logged in user
      setLoggedUserId(
        userData["http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor"]
      );
    }

  }, [userRole, loggedUserId]); // Add userRole and loggedUserId to the dependency array


  const handleLogout = () => {
    localStorage.removeItem('access-token');
    navigate('/login');
  };

  const isStoreKeeperOrAdmin =
    userRole === "Admin" || (userRole === 'Store Keeper' &&
      stores.some((store) => store.userId === loggedUserId));
  
  return (
    <div className="header">
      <div className="flex-between">
        {isStoreKeeperOrAdmin ? (
          <div className="flex">
            <div className="flex">
              <img className="logo-img" src={logoPic} alt="" />
              {isMobile ? (
                <div className="nav-links-mobile">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/category">
                    Category
                  </Link>
                    <Link className="nav-link" to="/dashboard/statistics">
                      Dashboard
                    </Link>
                  <div className="div-mobile">
                    {localStorage.getItem("access-token") != null ? (
                      <button className="nav-link icon" onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <Link to="/login" className="nav-link icon">
                        <BsPersonCircle />
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="nav-links-desktop">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/category">
                  Category
                </Link>
                <Link className="nav-link" to="/dashboard/statistics">
                  Dashboard
                </Link>
                {localStorage.getItem("access-token") != null ? (
                  <button className="nav-link icon" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="nav-link icon">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex">
            <img className="logo-img" src={logoPic} alt="" />
            {isMobile ? (
              <div className="nav-links-mobile">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/category">
                  Category
                </Link>
                <div className="div-mobile">
                  <Link className="nav-link icon" to="/wishlist">
                    <AiOutlineHeart />
                  </Link>
                  <Link className="nav-link icon" to="/shoppingcart">
                    <AiOutlineShopping />
                  </Link>
                  {localStorage.getItem("access-token") != null ? (
                    <button className="nav-link icon" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="nav-link icon">
                      <BsPersonCircle />
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="nav-links-desktop">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/category">
                Category
              </Link>


              <Link className="nav-link icon" to="/wishlist">
                <AiOutlineHeart />
              </Link>
              <Link className="nav-link icon" to="/shoppingcart">
                <AiOutlineShopping />
              </Link>
              {localStorage.getItem("access-token") != null ? (
                <button className="nav-link icon" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link icon">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <FaTimes /> : <BiMenu />}
        </button>
      </div>
    </div>
  );
}
