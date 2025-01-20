import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">TravelTrucks</div>
      <ul className="menu">
        <li className="menu-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
