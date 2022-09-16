
import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import userContext from './userContext';

/** Displays Navigation bar with links to homepage, company list, and job list
 *
 * Props:
 * - logout: function called from parent
 *
 * State:
 * - isOpen: boolean
 *
 * App -> Navigation
 *
*/

function Navigation({ logout }) {
  const { currentUser } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function loggedIn() {
    return (
      <>
        <NavItem>
          <NavLink to="/profile"
            activeclassname="active"
            tag={RRNavLink}>Profile</NavLink>
        </NavItem>
        <NavItem>
          <button
            className="nav-link"
            onClick={logout}>Log out, {currentUser.firstName}
          </button>
        </NavItem>
      </>
    );
  }

  function loggedOut() {
    return (
      <>
        <NavItem>
          <NavLink to="/login"
            activeclassname="active"
            tag={RRNavLink}>Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup"
            activeclassname="active"
            tag={RRNavLink}>Sign Up</NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/" style={{ color: "blue" }}>Friender Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {currentUser && loggedIn()}
            {!currentUser && loggedOut()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default Navigation;