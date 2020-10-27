import React, { useContext } from "react";
import UserContext from "./UserContext";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function AppNav({ logout }) {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
        <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        <Nav.Link as={Link} to="/" onClick={logout}>Log Out</Nav.Link>
      </Nav>
    )
  }

  const loggedOutNav = () => {
    return (
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
      </Nav>
    )
  }

  return (
    <Navbar bg="dark" expand="md" fixed="top" variant="dark">
      <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="ml-auto">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Navbar.Collapse>
    </Navbar>
  )
}
