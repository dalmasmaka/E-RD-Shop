import { Link } from "react-router-dom";
import  "./Components.css"
import Dashboard from "./Dashboard";

export default function Sidebar(){
    return(
        <div className="sidebar-content">
            <div className="sidebar-inner-content">
                <ul>
                    <Link to="statistics"><h2 className="shop-name">ERD Shop Management</h2></Link>
                    <li>
                        <Link to="store"> Store Configuration</Link>
                    </li>
                    <hr></hr>
                    <li>
                        <Link to="category">Categories</Link>
                    </li>
                    <li>
                        <Link to="product">Products</Link>
                    </li>
                    <li>
                        <Link to="productvariant">Product Variant</Link>
                    </li>
                    <hr></hr>
                    <li>
                        <Link to="order">Orders</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}