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
      <ul>
        <div className="nav-links">
          <NavLink to="/account/signup" activeclassname="active-link">
            Signup
          </NavLink>
          <NavLink to="/Token" activeclassname="active-link">
            Login
          </NavLink>
          <NavLink to="/account/signup" activeclassname="active-link">
            Signup
          </NavLink>
          <NavLink to="/locations/" activeclassname="active-link">
            Locations List
          </NavLink>
          <NavLink to="/locations/form/" activeclassname="active-link">
            Locations Form
          </NavLink>
          <NavLink to="/accessibility/form/" activeclassname="active-link">
            Add an Accessibility
          </NavLink>
          <NavLink to="/review/form/" activeclassname="active-link">
            Create a Review
          </NavLink>
          <NavLink to="/comments/new/" activeclassname="active-link">
            Add a Comment
          </NavLink>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
