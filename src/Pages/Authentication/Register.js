import React, { useState } from "react";
import UseAuth from "../Context/UseAuth";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { emailPassSignIn } = UseAuth();
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState({});
  const [conPass, setConPass] = useState({});
  const [name, setName] = useState(null);
  let navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleConPass = (e) => {
    setConPass(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name) {
      alert("name is required");
    }
    if (!email) {
      alert("email is required");
    } else {
      if (pass === conPass) {
        emailPassSignIn(email, pass, navigate, name);
      } else {
        alert("Password and Confirm Password is not match");
      }
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center login-parent p-5 align-items-center">
        <div className="login p-5">
          <div className="d-flex justify-content-around mb-5">
            <h3 className="signup ps-4 pe-4 pt-3 pb-3 text-center">Sign Up</h3>
          </div>
          <input
            placeholder="Name"
            type="text"
            className="mt-4 p-1 w-100"
            onBlur={handleName}
          />
          <input
            placeholder="email"
            type="email"
            className="mt-4 p-1 w-100"
            onBlur={handleEmail}
          />
          <br />
          <input
            placeholder="password"
            type="password"
            className="mt-4 p-1 w-100"
            onBlur={handlePass}
          />
          <input
            placeholder="Confirm password"
            type="password"
            className="mt-4 p-1 w-100"
            onBlur={handleConPass}
          />

          <br />
          <br />

          <div>
            <button className="login-btn pt-2 pb-2" onClick={handleRegister}>
              Sign In
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <NavLink to="/login" href="" className="mt-1 login-link">
              Already Registerd?
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
