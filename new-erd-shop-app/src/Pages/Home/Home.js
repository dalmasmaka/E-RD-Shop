import style from './Home.module.css'
import banner from '../../Assets/mall.mp4'
import { NavLink } from 'react-router-dom'

export default function Home () {
    return (
        <div className={style.home}>
            <div className={style.introDiv}>
                <video src={banner} className={style.banner} autoPlay loop muted />
                <div className={style.directToProducts}>
                    <h1>WELCOME TO ERD-SHOP</h1>
                    <button><NavLink to="/products">FIND THE BEST PRODUCTS FOR YOU</NavLink></button>
                </div>
            </div>
        </div>
    )
}