import './LoginCss.css';
import React, { useState } from "react";
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { BASE_URL, singIn } from '../../API/api';

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) =>{
        const url = `${BASE_URL}/Authentication/SignIn`
        const requestData = {
          email: email,
          password: password
        };
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then(data => {
            localStorage.setItem('Token', data.Result.Token);
            localStorage.setItem('Identification', data.Result.Identification);
          })
          .catch(error => {
            console.error("Error:",error);
          });
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="auth-form-container">
            <h2 className='login-txt'>Log In</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
            <div className="input-flex">
                <MdEmail />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"></input>
                </div>
                <div className="input-flex">
                <AiFillLock />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password"></input>
            </div>   
            <button className='loginBtn' type='submit'>Login</button>   
            </form>
            <Link className='linkBtn' to="/register">Don't have an account? Register here.</Link>     
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
          navigate('/');
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