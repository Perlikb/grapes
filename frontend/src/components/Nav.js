import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/" className="navLink">
        Home
      </Link>
      <Link to="/form" className="navLink">
        Form
      </Link>
      <Link to="/inventory" className="navLink">
        Inventory
      </Link>
    </div>
  );
};

export default Nav;
