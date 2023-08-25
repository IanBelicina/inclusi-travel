import React from "react";
import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/account/signup" activeclassname="active-link">
          Signup
        </NavLink>
        <NavLink to="/Token" activeclassname="active-link">
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Nav;
