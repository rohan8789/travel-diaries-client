import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("hellloooo", auth.isLoggedIn);
  const toggleMenu = () => {
    let x = document.getElementById("hamburger-div");
    if (x.style.display === "block") x.style.display = "none";
    else x.style.display = "block";
  };

  const logMeOut = () =>{
    auth.logout();
    navigate('/login');
  }

  return (
    <>
      <div id="hamburger-div">
        <div id="myLinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Authenticate</NavLink>
          <NavLink to="/u2/places">My Places</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </div>
      </div>
      <button className="hamburger-btn" onClick={toggleMenu}>
        ☰
      </button>
      <h1 className="h1">Travel Dairies</h1>
      <nav className="nav">
        <ul className="ul">
          <li className="li">
            <NavLink to="/" exact>Home</NavLink>
          </li>
          {auth.isLoggedIn && 
          <li className="li">
            <NavLink to="/u2/places">My visits</NavLink>
          </li>
          }
          {auth.isLoggedIn && 
          <li className="li">
            <NavLink to="/places/new">New Visit</NavLink>
          </li>
          }
          {!auth.isLoggedIn &&
          <li className="li">
            {auth.toggle === false && (
              <NavLink to="/signup">Authenticate</NavLink>
              )}
            {auth.toggle === true && (
              <NavLink to="/login">Authenticate</NavLink>
              )}
          </li>
          }
          {auth.isLoggedIn &&
            <li className="li">
              <button id='btn-3' className="logout-btn" onClick={logMeOut}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
