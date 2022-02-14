import React from "react";
//import "../App.css";
import { Link } from "react-router-dom";
import { Navbar, Button, Form, Col, Row } from "react-bootstrap";

const Nav = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Nav.Link as={Link} to="/" className="navLink">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/form" className="navLink">
        Form
      </Nav.Link>
      <Nav.Link as={Link} to="/inventory" className="navLink">
        Inventory
      </Nav.Link>
      <Nav.Link as={Link} to="/grapestable" className="navLink">
        GrapesTable
      </Nav.Link>
    </Navbar>
  );
};

export default Nav;
