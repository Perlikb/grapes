import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "../App.css";

const NavComponent = () => {
  return (
    <Navbar bg="primary" variant="light" expand="lg">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse>
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "500px" }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/form">
            Form
          </Nav.Link>
          <Nav.Link as={Link} to="/newinventory">
            New Inventory
          </Nav.Link>
        </Nav>
        {/*<Link to="/inventory" className="navLink">
        Inventory
  </Link>*/}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
