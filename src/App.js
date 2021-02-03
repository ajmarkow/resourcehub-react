import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import Routes from "./Routes";
import React, { useState } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import "./index.css";

import { AppContext } from "./libs/contextLib";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }
  
  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Container fluid className="p-0">
        <Row className="p-0">
          <Column className="p-0">
            <Navbar collapseOnSelect bg="light" sticky="top">
              <LinkContainer to="/">
                <Navbar.Brand className="gradient">
                  <h1>RE:SOURCE HUB</h1>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end p-4">
                <Nav activeKey={window.location.pathname}>
                  {isAuthenticated ? (
                    <Button className="noto" variant="primary">
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Button>
                  ) : (
                    <>
                      <ButtonGroup>
                        <Button className="noto" variant="dark">
                          <Nav.Link href="/signup">Create Account</Nav.Link>
                        </Button>
                        <Button className="noto" variant="danger">
                          <Nav.Link href="/login">Login </Nav.Link>
                        </Button>
                      </ButtonGroup>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Column>
        </Row>
        <Routes />
      </Container>
    </AppContext.Provider>
  );
}

export default App;
