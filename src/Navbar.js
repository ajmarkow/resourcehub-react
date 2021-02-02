import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import "./index.css";

function OurNav() {
  return (
    <Navbar collapseOnSelect bg="light" sticky="top">
      <LinkContainer to="/">
        <Navbar.Brand className="gradient">
          <h1>RE:SOURCE HUB</h1>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end p-4">
        <Nav activeKey={window.location.pathname}>
          <ButtonGroup>
            <Button className="noto" variant="dark">
              <Nav.Link href="/signup">Create Account</Nav.Link>
            </Button>
            <Button className="noto" variant="danger">
              <Nav.Link href="/login">Login </Nav.Link>
            </Button>
          </ButtonGroup>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default OurNav;