import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";

function OurNav() {
  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="fluid">
      <Navbar.Brand className="gradient">
        <h1>RE:SOURCE HUB</h1>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar>
  );
}

export default OurNav;