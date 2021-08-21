import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";
import { cookieService } from "../../../services/cookies/cookieService";
import { LoginContext } from "../../../context/LoginContext";
import { UserContext } from "../../../context/UserContext";
import './css/renderWithNavigation.css'

export default function renderWithNavigation(WrappedComponent: React.ComponentType<any>) {
  return () => {
    const [collapsed, setCollapsed] = useState(true)
    const { setLoggedIn } = useContext(LoginContext)
    const { firstName, lastName } = useContext(UserContext)

    const toggleNavbar = () => setCollapsed(!collapsed)

    const handleLogOut = () => {
      setLoggedIn(false, true)
      cookieService.remove('accessToken')
    }

    return (
      <div>
        <Navbar dark className="navbar" expand="md">
          <NavbarBrand href="/" className="mr-auto navBrand">{firstName} {lastName}</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse data-testid="navCollapse" isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link className="navLink" to="/dashboard">Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link className="navLink" to="/login" onClick={handleLogOut}>Log out</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <WrappedComponent />
      </div>
    );
  };
}
