import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import useAuth  from "@galvanize-inc/jwtdown-for-react";

function Nav() {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="Logo_no_bg.png" alt="logo" className="logo-image" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/account/signup" activeclassname="active-link">
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Token" activeclassname="active-link">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/locations/" activeclassname="active-link">
                Locations List
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/locations/form/" activeclassname="active-link">
                Locations Form
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/accessibility/form/" activeclassname="active-link">
                Add an Accessibility
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/review/form/" activeclassname="active-link">
                Create a Review
              </NavLink>
            </li>
<<<<<<< HEAD

            {auth.token && (
              <li className="nav-item">
                <LogoutButton />
              </li>
            )}

            {/* <li className="nav-item">
=======
            <li className="nav-item">
>>>>>>> main
              <NavLink to="/comments/new/" activeclassname="active-link">
                Add a Comment
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
