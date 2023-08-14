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

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [userRole, setUserRole] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserRole(
        userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("access-token") != undefined) {
      const userData = parseJwt(localStorage.getItem("access-token"));
      setUserRole(
        userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
    }
  }, [params]);

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
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="flex-between">
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
              {userRole === "Admin" ? (
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              ) : null}
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
            {userRole === "Admin" ? (
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            ) : null}
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
