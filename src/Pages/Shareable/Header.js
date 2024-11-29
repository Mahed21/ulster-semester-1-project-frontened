import React, { useEffect, useState } from "react";
import UseAuth from "../Context/UseAuth";
import { NavLink } from "react-router-dom";
import logo from "../../images/download.png";
import "./Shareable.css";

const Header = () => {
  const { user, Logout } = UseAuth();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin))
      .catch((error) => console.error("Error fetching data:", error));
  }, [user]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            TikTok
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {user.email === admin ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="adminDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/loadDeleteVideo">
                        Delete
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : null}

              {user.email ? (
                <div className="d-flex align-items-center">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/uploadVideo">
                      Upload Video
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" onClick={Logout} to="/login">
                      Logout
                    </NavLink>
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
