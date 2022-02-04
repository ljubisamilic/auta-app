import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useGlobalcontext } from "../context";

const NavbarComponent = () => {
  const { user, setUser } = useGlobalcontext();
  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          AUTA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-5">
            {user && (
              <>
                <Nav.Link as={Link} to="addcar">
                  Dodaj auto
                </Nav.Link>
                <Nav.Link as={Link} to="addbrand">
                  Dodaj brend
                </Nav.Link>
                <Nav.Link as={Link} to="mycars">
                  Lista
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Link as={Link} to="login">
                  <Button variant="outline-dark">Prijava</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="register">
                  <Button variant="dark">Registracija</Button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="login">
                <Button onClick={handleLogout} variant="outline-dark">
                  Odjava
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
