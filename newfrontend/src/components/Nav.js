import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Nav = () => {
  return (
    <div>
      <Link to="/" className="navLink">
        Home
      </Link>
      <Link to="/form" className="navLink">
        Form
      </Link>
      <Link to="/newinventory" className="navLink">
        New Inventory
      </Link>
      {/*<Link to="/inventory" className="navLink">
        Inventory
  </Link>*/}
    </div>
  );
};

export default Nav;
