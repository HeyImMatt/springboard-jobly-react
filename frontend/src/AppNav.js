import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function AppNav() {
  return (
    <Navbar bg="dark" expand="md" fixed="top" variant="dark">
      <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="ml-auto">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
          <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
