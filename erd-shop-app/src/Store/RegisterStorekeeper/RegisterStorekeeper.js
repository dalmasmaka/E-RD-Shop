import './RegisterStorekeeperCss.css';
import React, { useState } from "react";
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';

export const RegisterStorekeeper = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 


    const handleSubmit = (e) =>{
        e.preventDefault();

        if(password === confirmPassword){
            navigate('/home');
        }
    }

    return (
        <div className="auth-form-container">
            <h2 className='register-txt'>Register as Storekeeper</h2>
            <form className="registerForm" onSubmit={handleSubmit}>
              <div className="input-flex">
                <FaUser />
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" id="name" name="name"></input>
              </div>
                <div className="input-flex">
                <MdEmail />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"></input>
                </div>
                <div className="input-flex">
                <AiFillLock />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"></input>
               </div>
                <div className="input-flex">
                <AiFillLock />
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" id="confirm-password" name="confirmPassword"></input>
               </div>
                <button className='registerBtn'>Register</button>
            </form>
            <Link className="linkregisterBtn" to="/register">Want to register as a client? Register here.</Link>
                <Link className="linkBtn" to="/">Already have an account? Login here.</Link>
                <div>
      <LoginSocialGoogle
        client_id={
            "833828937714-rve19ssafecb8tqk79vis2i8rldsoki7.apps.googleusercontent.com"
        }
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
          navigate('/home');
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>
        </div>
        
    )
}