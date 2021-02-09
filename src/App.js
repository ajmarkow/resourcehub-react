import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import Routes from "./Routes";
import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import "./index.css";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import { BsFillPlusSquareFill, BsCreditCard, BsFillHouseFill } from "react-icons/bs";
import ScrollToTop from "react-scroll-up";

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  return (
    !isAuthenticating && (
      <Container fluid className="p-0">
        <Row className="p-0">
          <Column className="p-0">
            <Navbar collapseOnSelect bg="light" sticky="top">
              <LinkContainer to="/" title="All posts">
                <Navbar.Brand className="gradient">
                  <h1>RE:SOURCE HUB</h1>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end p-4">
                {isAuthenticated && (
                  <span className="text-nowrap">
                    <Nav.Link
                      href="/home"
                      data-toogle="tooltip"
                      title="Your posts"
                    >
                      <BsFillHouseFill size={30} />
                    </Nav.Link>
                  </span>
                )}

                <Nav.Link href="/donate" title="Donate">
                  <span>
                    <BsCreditCard size={30} />
                  </span>
                </Nav.Link>

                {isAuthenticated && (
                  <Nav.Link href="/posts/new" title="Share posts">
                    <span>
                      <BsFillPlusSquareFill
                        size={26}
                        className="menu-padding"
                      />
                    </span>
                  </Nav.Link>
                )}

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
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <ScrollToTop showUnder={100}>
          <Button outline variant='primary'>Return to Top</Button>
        </ScrollToTop>
      </Container>
    )
  );
}

export default App;
