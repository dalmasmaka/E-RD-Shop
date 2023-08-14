import { useState } from "react";
import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await fetch(
        `https://localhost:5000/api/Authentication/SignIn`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
            Token: "",
          }),
        }
      ).then((res) => res.json());
      if (result.Result.Token !== undefined) {
        localStorage.setItem("access-token", result.Result.Token);
        navigate("/");
      } else {
        alert(result.Message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.loginDiv}>
      <div className={style.contentDiv}>
        <h1>LOGIN</h1>
        <form
          className={style.registerForm}
          onSubmit={async (e) => handleLogin(e)}
        >
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={style.emailInput}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={style.passwordInput}
            required
          />
          <br />
          <button className={style.submitButton} type="submit">
            Login
          </button>
        </form>
        <div className={style.storekeeperDiv}>
          <p>Don't have an account?</p>
          <NavLink to="/register/user">Register here</NavLink>
        </div>
      </div>
    </div>
  );
}
