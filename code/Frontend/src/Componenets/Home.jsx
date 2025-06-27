// src/components/Home.jsx

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="" variant="dark" expand="lg" style={{ backgroundColor: "blue" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: 'white', textDecoration: "none" }}>BookStore</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/login" style={{ padding: "10px", color: "white", textDecoration: "none" }}>User</Link>
              <Link to="/slogin" style={{ padding: "10px", color: "white", textDecoration: "none" }}>Seller</Link>
              <Link to="/alogin" style={{ padding: "10px", color: "white", textDecoration: "none" }}>Admin</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home Page Content */}
      <div className="container text-center mt-5">
        <h1>Welcome to BookStore 📚</h1>
        <p>Select your role to continue:</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/login" className="btn btn-primary">User Login</Link>
          <Link to="/slogin" className="btn btn-success">Seller Login</Link>
          <Link to="/alogin" className="btn btn-danger">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
