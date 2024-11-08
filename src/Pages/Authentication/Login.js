import React, { useState } from "react";
import "./Autentication.css";
import { useNavigate } from "react-router";
import UseAuth from "../Context/UseAuth";
import { NavLink } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const { googleSignIn, user, emailPassLogIn } = UseAuth();
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  //console.log(user.email);
  if (user.email) {
    navigate("/");
  }
  const emailHandle = (e) => {
    setEmail(e.target.value);
  };
  const passHandle = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    emailPassLogIn(email, password, navigate);
  };

  return (
    <div className="login-parent">
      <div className="d-flex justify-content-center p-5 align-items-center">
        <div className="login p-5">
          <div className="d-flex justify-content-around mb-3">
            <h4 className="signup ps-4 pe-4 pt-3 pb-3 text-center">Sign in</h4>
          </div>

          <input
            placeholder="Email"
            type="email"
            className="mt-4 p-1 w-100"
            onBlur={emailHandle}
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            className="mt-4 p-1 w-100"
            onBlur={passHandle}
          />

          <br />
          <br />
          <div>
            <button className="login-btn pt-2 pb-2 mb-3" onClick={handleLogin}>
              Login
            </button>
          </div>
          <div className="">
            <button className="google-btn pt-2 pb-2" onClick={googleSignIn}>
              Login with Google
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <NavLink to="/register" className="mt-1 login-link" href="">
              Not Registerd?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
