import style from './Header.module.css'
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Routes,
  } from "react-router-dom";

export default function Header() {
    return (
        <div className={style.header}>
            <ul>
                <NavLink className={style.link} to="/">
                    <div>
                        Home
                    </div>
                </NavLink>
                <NavLink className={style.link} to="/products">
                    <div>
                        Products
                    </div>
                </NavLink>
                <NavLink className={style.link} to="/dashboard">
                    <div>
                        Dashboard
                    </div>
                </NavLink>
                <NavLink className={style.link} to="/login">
                    <div>
                        Login
                    </div>
                </NavLink>
            </ul>
        </div>
    )
}