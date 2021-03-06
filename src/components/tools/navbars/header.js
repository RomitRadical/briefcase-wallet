import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

library.add(faBriefcase);

const Header = props => {
  return (
    <div>
      <Navbar style={styles.container} light>
        <NavbarBrand style={styles.headerText} className="mr-auto">
          <FontAwesomeIcon icon="briefcase" /> Briefcase
        </NavbarBrand>
        <NavbarToggler
          style={styles.hamburger}
          onClick={props.onClick}
          className="mr-1"
        />
        <Collapse isOpen={props.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink style={styles.text} href="/">
                Wallet
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={styles.text} href="/settings">
                Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={styles.text} href="/about">
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0492CE"
  },
  headerText: {
    color: "white",
    fontFamily: "Righteous"
  },
  text: {
    color: "white"
  },
  hamburger: {
    backgroundColor: "white"
  }
};
